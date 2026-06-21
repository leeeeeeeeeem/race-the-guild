import express from 'express';
import passport from 'passport';
import Network from './network.js';
import Game from './game.js';

const router = express.Router();
const network = new Network();
const game = new Game();

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: 'Non autorizzato' });
};

router.post('/sessions', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: info });
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json(req.user);
        });
    })(req, res, next);
});

router.delete('/sessions/current', (req, res) => {
    req.logout(() => {
        res.end();
    });
});

router.get('/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }
    return res.status(401).json({ error: 'Non autenticato' });
});

router.get('/network', async (_, res) => {
    try {
        const stations = await network.getStations();
        const lines = await network.getLines();
        const connections = await network.getConnections();
        res.json({ stations, lines, connections });
    } catch (err) {
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

router.get('/leaderboard', isLoggedIn, async (_, res) => {
    try {
        const leaderboard = await game.getLeaderboard();
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

router.post('/games', isLoggedIn, async (req, res) => {
    try {
        const stations = await network.getStations();

        let startStation, endStation;
        let distance = 0;

        while (distance < 3 ) {
            const idx1 = Math.floor(Math.random() * stations.length);
            let idx2 = Math.floor(Math.random() * stations.length);
            while (idx1 === idx2) {
                idx2 = Math.floor(Math.random() * stations.length);
            }
            startStation = stations[idx1];
            endStation = stations[idx2];
            distance = await network.getDistance(startStation.id, endStation.id);
        }

        req.session.gameStartTime = Date.now();
        req.session.startStationId = startStation.id;
        req.session.endStationId = endStation.id;
        req.session.gameInProgress = true;

        res.json({
            startStation,
            endStation
        });

    } catch(err) {
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

// riceve percorso dal client, lo valida e se va bene assegna gli eventi casualmente
router.post('/games/submit', isLoggedIn, async (req, res) => {
    try {
        if (!req.session.gameInProgress) {
            return res.status(400).json({ error: 'Nessuna partita in corso' });
        }

        const elapsed = (Date.now() - req.session.gameStartTime) / 1000;
        const isTimeout = elapsed > 95;

        if (isTimeout) {
            await game.saveGame(req.user.id, 0);
            req.session.gameInProgress = false;
            return res.json({
                valid: false,
                error: 'Tempo scaduto',
                score: 0,
                steps: []
            });
        }

        const { path } = req.body;
        const connections = await network.getConnections();
        const startId = req.session.startStationId;
        const endId = req.session.endStationId;

        // logica per controllo del percorso
        const validatePath = (p, sId, eId, conns) => {
            if (!Array.isArray(p) || p.length < 2) {
                return false;
            }
            if (p[0] !== sId) {
                return false;
            }
            if (p[p.length - 1] !== eId) {
                return false;
            }

            const connections = new Set();
            for (const c of conns) {
                connections.add(`${c.station1_id}-${c.station2_id}`);
            }

            const visitedEdges = new Set();

            for (let i = 0; i < p.length - 1; i++) {
                const u = p[i];
                const v = p[i + 1];
                const key = `${u}-${v}`;

                if (!connections.has(key)) {
                    return false;
                }

                const edgeId = [u, v].sort().join('-');
                if (visitedEdges.has(edgeId)) {
                    return false;
                }
                visitedEdges.add(edgeId);
            }

            return true;
        };

        const isValid = validatePath(path, startId, endId, connections);

        if (!isValid) {
            await game.saveGame(req.user.id, 0);
            req.session.gameInProgress = false;
            return res.json({
                valid: false,
                score: 0,
                steps: []
            });
        }

        const events = await game.getEvents();
        const stations = await network.getStations();
        const stationMap = {};
        for (const s of stations) {
            stationMap[s.id] = s.name;
        }

        const selectEvent = (evs) => {
            const idx = Math.floor(Math.random() * evs.length);
            return evs[idx];
        };

        let currentCoins = 20;
        const steps = [];

        for (let i = 0; i < path.length - 1; i++) {
            const selectedEvent = selectEvent(events);
            currentCoins += selectedEvent.effect;
            steps.push({
                from: stationMap[path[i]],
                to: stationMap[path[i + 1]],
                event: {
                    id: selectedEvent.id,
                    description: selectedEvent.description,
                    effect: selectedEvent.effect
                },
                coins: currentCoins
            });
        }

        const finalScore = Math.max(0, currentCoins);
        await game.saveGame(req.user.id, finalScore);
        req.session.gameInProgress = false;

        res.json({
            valid: true,
            steps,
            score: finalScore
        });

    } catch(err) {
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

export default router;
