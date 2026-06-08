import { pool } from '../config/db.js';

export const findUserByUsername = async (username) => {
    const query = `
    SELECT id, username, password_hash 
    FROM users 
    WHERE username = $1`;
    const { rows } = await pool.query(query, [username]);
    return rows[0];
};

export const findUserById = async (id) => {
    const query = `
    SELECT id, username, role, email
    FROM users
    WHERE id = $1`
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

export const findBooks = async ({ search, genre }) => {
    let query = `
        SELECT id, title, author, pages, total_stock, genre, cover_img_url
        FROM books
        WHERE 1=1
        `;

    const params = [];
    let i = 1;

    if (search) {
        query += ` AND (title ILIKE $${i} OR author ILIKE $${i})`;
        params.push(`%${search}%`);
        i++;
    }

    if (genre) {
        const genres = Array.isArray(genre) ? genre : [genre];
        const placeholders = genres.map(() => `$${i++}`).join(', ');
        query += ` AND genre IN (${placeholders})`;
        params.push(...genres);
    }

    const result = await pool.query(query, params);
    return result.rows;
};

export const borrowBook = async (userId, bookId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const loanQuery = `
                INSERT INTO loans (user_id, book_id, checked_out_at, due_at)
                VALUES ($1, $2, NOW(), NOW() + INTERVAL '1 days')
                RETURNING *;
                `;

        const loanResult = await client.query(loanQuery, [userId, bookId]);

        const updateStockQuery = `
                UPDATE books
                SET total_stock = total_stock - 1, checkout_count = checkout_count + 1
                WHERE id = $1 AND total_stock > 0
                RETURNING *;
                `;

        const bookResult = await client.query(updateStockQuery, [bookId]);

        if (bookResult.rows.length === 0) {
            await client.query('ROLLBACK');
            throw new Error('Book is out of stock');
        }

        await client.query('COMMIT');
        return { loan: loanResult.rows[0], book: bookResult.rows[0] };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

export const getProfile = async (userId) => {
    const query = `
        SELECT 
            id,
            username,
            email,
            created_at AS "createdAt",
            (SELECT COUNT(*) FROM loans WHERE user_id = $1) AS "totalBorrowed"
        FROM users
        WHERE id = $1
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
};
 
export const getBorrowedBooks = async (userId) => {
    const query = `
        SELECT
            l.id         AS id,
            b.title,
            b.author,
            b.genre,
            b.cover_img_url AS "coverImgUrl",
            l.due_at     AS "dueDate"
        FROM loans l
        JOIN books b ON l.book_id = b.id
        WHERE l.user_id = $1
          AND l.returned_at IS NULL
        ORDER BY l.due_at ASC
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
};
 
export const returnBook = async (userId, loanId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
 
        const loanResult = await client.query(
            `UPDATE loans
             SET returned_at = NOW()
             WHERE id = $1 AND user_id = $2 AND returned_at IS NULL
             RETURNING *`,
            [loanId, userId]
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
 
export const getBorrowHistory = async (userId) => {
    const query = `
        SELECT
            l.id              AS id,
            b.title,
            b.author,
            b.genre,
            b.cover_img_url   AS "coverImgUrl",
            l.checked_out_at  AS "checkedOutAt",
            l.returned_at     AS "returnedAt"
        FROM loans l
        JOIN books b ON l.book_id = b.id
        WHERE l.user_id = $1
          AND l.returned_at IS NOT NULL
        ORDER BY l.returned_at DESC
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
};

export const getPopularBooks = async () => {
    const query = `
        SELECT id, title, author, genre, cover_img_url AS "coverImgUrl"
        FROM books
        ORDER BY checkout_count DESC
        LIMIT 10
        `;
        const { rows } = await pool.query(query);
        return rows;
}