import express from 'express';
import passport from 'passport';

const router = express.Router();

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

export default router;
