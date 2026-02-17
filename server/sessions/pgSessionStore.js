import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';
import {pool} from '../config/db.js';

const PgSession = connectPgSimple(session);

export default new PgSession({
    pool,
    tableName: 'session'
});