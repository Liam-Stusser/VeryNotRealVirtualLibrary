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
})

export default router;