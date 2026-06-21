import db from './db.js';
import crypto from 'crypto';

function seed() {
    db.serialize(() => {
        db.run("DELETE FROM games");
        db.run("DELETE FROM connections");
        db.run("DELETE FROM stations");
        db.run("DELETE FROM lines");
        db.run("DELETE FROM events");
        db.run("DELETE FROM users");
        
        db.run("DELETE FROM sqlite_sequence WHERE name IN ('games', 'connections', 'stations', 'lines', 'events', 'users')");

        const users = [
            { username: 'PaulAtreides', password: 'LisanAlGaib' },
            { username: 'BaronHarkonnen', password: 'Spice123' },
            { username: 'DuncanIdaho', password: 'CantDie200' },
            { username: 'LadyJessica', password: 'Sisterhood' },
            { username: 'MilesTeg', password: 'MentatGeneral' }
        ];

        users.forEach((u, index) => {
            const salt = crypto.randomBytes(16).toString('hex');
            const hashedPassword = crypto.scryptSync(u.password, salt, 64).toString('hex');
            db.run(`INSERT INTO users (id, username, password, salt) VALUES (?, ?, ?, ?)`, [index + 1, u.username, hashedPassword, salt]);
        });

        const stations = [
            { id: 1, name: 'Caladan' },
            { id: 2, name: 'Ginaz' },
            { id: 3, name: 'Arrakis' },
            { id: 4, name: 'Giedi Prime' },
            { id: 5, name: 'Wallach IX' },
            { id: 6, name: 'Ix' },
            { id: 7, name: 'Kaitain' },
            { id: 8, name: 'Salusa Secundus' },
            { id: 9, name: 'Junction' },
            { id: 10, name: 'Ecaz' },
            { id: 11, name: 'Tleilax' },
            { id: 12, name: 'Richese' },
            { id: 13, name: 'Chapterhouse' },
            { id: 14, name: 'Lampadas' },
            { id: 15, name: 'Corrin' }
        ];

        stations.forEach(s => {
            db.run(`INSERT INTO stations (id, name) VALUES (?, ?)`, [s.id, s.name]);
        });

        const lines = [
            { id: 1, name: 'Linea Atreides', color: '#a6e3a1' }, //verde
            { id: 2, name: 'Linea Harkonnen', color: '#f38ba8' }, //rosso
            { id: 3, name: 'Linea Imperiale', color: '#f9e2af' }, //giallo
            { id: 4, name: 'Linea della Gilda', color: '#fab387' }, //arancione
            { id: 5, name: 'Linea Bene Gesserit', color: '#89b4fa' } //blu
        ];

        lines.forEach(l => {
            db.run(`INSERT INTO lines (id, name, color) VALUES (?, ?, ?)`, [l.id, l.name, l.color]);
        });

        const events = [
            { id: 1, desc: 'Viaggio tranquillo', effect: 0 },
            { id: 2, desc: 'Incontro con un Mentat', effect: 1 },
            { id: 3, desc: 'Influenza delle Bene Gesserit', effect: 1 },
            { id: 4, desc: 'Commercio con un mercantile della Gilda', effect: 2 },
            { id: 5, desc: 'Dono dei contrabbandieri', effect: 3 },
            { id: 6, desc: 'Vendita di spezia al mercato nero', effect: 4 },
            { id: 7, desc: 'Ritardo della Gilda Spaziale', effect: -1 },
            { id: 8, desc: 'Pattuglia dei Sardaukar', effect: -2 },
            { id: 9, desc: 'Collisione con detriti spaziali', effect: -3 },
            { id: 10, desc: 'Guasto al generatore Holtzman', effect: -4 }
        ];

        events.forEach(e => {
            db.run(`INSERT INTO events (id, description, effect) VALUES (?, ?, ?)`, [e.id, e.desc, e.effect]);
        });

        const connections = [
            [1, 2, 1], [2, 3, 1], [10, 3, 1],
            [4, 15, 2], [9, 15, 2], [9, 11, 2],
            [7, 15, 3], [3, 15, 3], [3, 8, 3],
            [12, 9, 4], [2, 9, 4], [2, 6, 4],
            [5, 14, 5], [3, 14, 5], [3, 9, 5], [13, 9, 5]
        ];

        connections.forEach(c => {
            db.run(`INSERT INTO connections (station1_id, station2_id, line_id) VALUES (?, ?, ?)`, [c[0], c[1], c[2]]);
            db.run(`INSERT INTO connections (station1_id, station2_id, line_id) VALUES (?, ?, ?)`, [c[1], c[0], c[2]]);
        });

        const games = [
            { user_id: 1, score: 24 },
            { user_id: 1, score: 15 },
            { user_id: 2, score: 22 },
            { user_id: 2, score: 18 },
            { user_id: 3, score: 10 },
            { user_id: 3, score: 26 },
            { user_id: 4, score: 19 },
            { user_id: 5, score: 12 }
        ];

        games.forEach(g => {
            db.run(`INSERT INTO games (user_id, score) VALUES (?, ?)`, [g.user_id, g.score]);
        });
    });
}

seed();
