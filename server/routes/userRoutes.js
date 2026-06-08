import express from 'express';
import passport from 'passport';
import {pool} from '../config/db.js';
import * as userModel from '../models/userModel.js';

const router = express.Router();

router.get('/search-books', async (req, res) => {
    try {
        const books = await userModel.findBooks(req.query);
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: `Internal server error: ${err.message}`});
    }
});

router.post('/borrow', async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'user')
    {
        return res.status(401).json({error: 'Unauthorized'});
    }

    try {
        const result = await userModel.borrowBook(req.user.id, req.body.bookId);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error: ' + err.message});
    }
});

router.get('/profile', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const profile = await userModel.getProfile(req.user.id);
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Internal server error: ${err.message}` });
    }
});
 
router.get('/borrowed-books', async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'user') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const books = await userModel.getBorrowedBooks(req.user.id);
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Internal server error: ${err.message}` });
    }
});
 
router.post('/return-book', async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'user') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const result = await userModel.returnBook(req.user.id, req.body.loanId);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Internal server error: ${err.message}` });
    }
});
 
router.get('/borrow-history', async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'user') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const history = await userModel.getBorrowHistory(req.user.id);
        res.json(history);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Internal server error: ${err.message}` });
    }
});

router.get('/popular-books', async (req, res) => {
    try {
        const books = await userModel.getPopularBooks();
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Internal server error: ${err.message}`});
    }
});

export default router;