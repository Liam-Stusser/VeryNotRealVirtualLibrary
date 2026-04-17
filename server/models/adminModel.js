import {pool} from '../config/db.js';

const defaultImage = 'this will be cahnged to a default image later';

export const findBooks = async (title, author) => {
    const conditions = [];
    const values = [];
    let index = 1;

    if(title)
    {
        conditions.push(`LOWER(title) LIKE LOWER($${index})`);
        values.push(`%${title}%`);
        index++;
    }

    if(author)
    {
        conditions.push(`LOWER(author) LIKE LOWER($${index})`);
        values.push(`%${author}%`);
        index++;
    }

    const query = `
        SELECT * FROM books
        WHERE ${conditions.join(' AND ')}
        ORDER BY created_at DESC
        `;
    
        const result = await pool.query(query, values);
        return result.rows;
}

export const addBook = async (title, author, pages, copies, genre, coverImage) => {

    if(!coverImage)
        coverImage = defaultImage;

    const result = await pool.query(
        `INSERT INTO books 
        (title, author, pages, total_stock, genre, cover_img_url) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [title, author, pages, copies, genre, coverImage]
    );

    return result.rows[0];
};

export const modifyBook = async (bookId, fields) => {
    const columnMap = {
        copies: 'total_stock',
        coverImage: 'cover_img_url',
        title: 'title',
        author: 'author',
        pages: 'pages',
        genre: 'genre'
    };

    const updates = [];
    const values = [];
    let index = 1;

    for(const key in fields)
    {
        const value = fields[key];

        if(value !== undefined && value !== '')
        {
            const column = columnMap[key] || key;

            updates.push(`${column} = $${index}`);
            values.push(value);
            index++;
        }
    }

    if(updates.length === 0) throw new Error('No valid fields provided for update');

    values.push(bookId);

    const query = `
        UPDATE books 
        SET ${updates.join(', ')}
        WHERE id = $${index}
        RETURNING *
        `;

        return await pool.query(query, values);
    }

export const deleteBook = async (bookId) => {
    const result = await pool.query(
        `DELETE FROM books
        WHERE id = $1
        RETURNING *`,
        [bookId]
    );

    if(result.rowCount === 0)
        throw new Error('Book not found');

    return result.rows[0];
}