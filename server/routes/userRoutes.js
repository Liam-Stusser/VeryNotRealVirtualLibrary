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

export default router;