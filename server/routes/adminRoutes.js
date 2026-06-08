import express from 'express';
import passport from 'passport';
import {pool} from '../config/db.js';
import {ensureAdmin} from '../middleware/ensureAuth.js';
import * as adminModel from '../models/adminModel.js';

const router = express.Router();

router.get('/find-book', ensureAdmin, async (req, res) => {
    const {title, author} = req.query;

    if(!title && !author)
    {
        return res.status(400).json({error: 'At least one search parameter (title or author) is required'});
    }

    try {
        const books = await adminModel.findBooks(title, author);

        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.post('/add-book', ensureAdmin, async (req, res) => {
    const {title, author, pages, copies, genre, coverImage} = req.body;

    if(!title || !author || !pages || !copies || !genre)
    {
        return res.status(400).json({error: 'All fields except cover image are required'});
    }

    try {
        await adminModel.addBook(title, author, pages, copies, genre, coverImage);
        res.status(201).json({message: 'Book added successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }

});

router.put('/modify-book', ensureAdmin, async (req, res) => {
    const {bookId, ...fields} = req.body;

    if(!bookId)
    {
        return res.status(400).json({error: 'Book ID is required'});
    }

    try {
        await adminModel.modifyBook(bookId, fields);
        res.status(200).json({message: 'Book modified successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.delete('/delete-book', ensureAdmin, async (req, res) => {
    const {bookId, confirm} = req.body;

    if(!bookId)
        return res.status(400).json({error: 'Book ID is required'});

    if(confirm !== 'DELETE')
        return res.status(400).json({error: 'You must type DELETE in the confirm field to delete a book'});

    try {
        await adminModel.deleteBook(bookId);
        res.status(200).json({message: 'Book deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
    
});

router.get('/overdue-books', async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const books = await adminModel.getOverdueBooks();
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Internal server error: ${err.message}` });
    }
});
 
router.post('/force-return', async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const result = await adminModel.forceReturnBook(req.body.loanId);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Internal server error: ${err.message}` });
    }
});

export default router;