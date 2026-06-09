import dotenv from 'dotenv'; //ESM was causing imports to load first then code, so express-session 
dotenv.config();             //was being created before enviornment variables exsisted.

import session from 'express-session';
import sessionStore from '../sessions/pgSessionStore.js';

const sessionMiddleware = session({
    name: 'virtual-library.sid',
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, //1 day
        sameSite: 'lax'
    }
});

export default sessionMiddleware;