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
    SELECT id, username, role, email
    FROM users
    WHERE id = $1`
    const {rows} = await pool.query(query, [id]);
    return rows[0];
}

export const findBooks = async ({search, genre}) => {
    let query = `
        SELECT id, title, author, pages, total_stock, genre, cover_img_url
        FROM books
        WHERE 1=1
        `;
    
    const params = [];
    let i = 1;

    if(search)
    {
        query += ` AND (title ILIKE $${i} OR author ILIKE $${i})`;
        params.push(`%${search}%`);
        i++;
    }

    if(genre)
    {
        const genres = Array.isArray(genre) ? genre : [genre];
        const placeholders = genres.map(() => `$${i++}`).join(', ');
        query += ` AND genre IN (${placeholders})`;
        params.push(...genres);
    }

    const result = await pool.query(query, params);
    return result.rows;
}