import {pool} from '../config/db.js';

export const findUserByUsername = async (username) => {
    const query = `
    SELECT id, username, password_hash 
    FROM users 
    WHERE username = $1`;
    const {rows} = await pool.query(query, [username]);
    return rows[0];
};

export const findUserById = async (id) => {
    const query = `
    SELECT id, username
    FROM users
    WHERE id = $1`
    const {rows} = await pool.query(query, [id]);
    return rows[0];
}