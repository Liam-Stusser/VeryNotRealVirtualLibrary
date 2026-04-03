import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import {pool} from '../config/db.js';
import {findUserById} from '../models/userModel.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, firstName, lastName, email, phone, password, confirmPassword} = req.body;

    if(!username || !firstName || !lastName || !email || !password || !confirmPassword)
    {
        return res.status(400).json({error: 'All fields are required'});
    }

    if (password !== confirmPassword)
    {
        return res.status(400).json({error: 'Passwords do not match'});
    }

    try {
        //check if username or email already exists
        const userExsits = await pool.query(
            'SELECT id FROM users WHERE username = $1 OR email = $2',
            [username, email]
        )

        if(userExsits.rowCount > 0)
        {
            return res.status(409).json({message: 'Username or email already exists'});
        }

        //Encrypt password
        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        //Insert new user into DB
        const result = await pool.query(
            `INSERT INTO users (username, first_name, last_name, email, phone, password_hash)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id, username, email`,
             [username, firstName, lastName, email, phone, passwordHash]
        )

        const newUser = result.rows[0];

        //create session for new user
        req.session.user = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        }

        res.status(201).json({message: 'Account created successfully', user: newUser})
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ error: info.message || 'Login failed' });
        }

        req.login(user, async(err) => {
            if (err) return next(err);

            const fullUser = await findUserById(user.id);
            
            req.session.user = {
                id: fullUser.id,
                username: fullUser.username,
                email: fullUser.email
            }
            
            return res.json({ 
                message: 'Login successful', 
                user: {
                    id: fullUser.id,
                    username: fullUser.username,
                    role: fullUser.role
                } 
            });
        });
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.json({message: 'Logout successful'});
        })
    });
});

router.get('/session', async (req,res) => {
    if(!req.isAuthenticated || !req.isAuthenticated())
    {
        return res.json( {isAuthenticated: false} );
    }

    try {
        const user = await findUserById(req.user.id);

        return res.json({
            isAuthenticated: true,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error' });
    }
})

export default router;