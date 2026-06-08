import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './user.js';
import apiRouter from './api.js';

const app = express();
const port = 3001;
const users = new User();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: 'swag',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async function verify(username, password, done) {
    try {
        const user = await users.getUserByCredentials(username, password);
        if (!user) {
            return done(null, false, 'Username o password sbagliati');
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
