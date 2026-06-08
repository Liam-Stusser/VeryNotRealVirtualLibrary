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

export const getOverdueBooks = async () => {
    const query = `
        SELECT
            l.id              AS "loanId",
            b.title,
            b.author,
            u.username,
            l.due_at          AS "dueDate"
        FROM loans l
        JOIN books b ON l.book_id = b.id
        JOIN users u ON l.user_id = u.id
        WHERE l.returned_at IS NULL
          AND l.due_at < NOW()
        ORDER BY l.due_at ASC
        LIMIT 10
    `;
    const { rows } = await pool.query(query);
    return rows;
};
 
export const forceReturnBook = async (loanId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
 
        const loanResult = await client.query(
            `UPDATE loans
             SET returned_at = NOW()
             WHERE id = $1 AND returned_at IS NULL
             RETURNING *`,
            [loanId]
        );
 
        if (loanResult.rows.length === 0) {
            await client.query('ROLLBACK');
            throw new Error('Loan not found or already returned');
        }
 
        const { book_id } = loanResult.rows[0];
 
        await client.query(
            `UPDATE books
             SET total_stock = total_stock + 1
             WHERE id = $1`,
            [book_id]
        );
 
        await client.query('COMMIT');
        return loanResult.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};