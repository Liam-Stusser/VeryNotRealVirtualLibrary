import express from 'express';
import session from 'express-session';
import passport from 'passport';
import pgsession from 'connect-pg-simple';
import dotenv from 'dotenv';

import {pool} from './config/db.js';
import './config/passport.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config();

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Sessions (need to research and study first)

//Passport (need to study still)

//Routes
app.use('/api/auth', authRoutes); //TODO: Replace API with actual route once I get that figured out
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

//Global
app.use((req,res,next) => {
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    if(!allowedMethods.includes(req.method))
    {
        return res.status(405).send(`Method: ${req.method} not allowed`);
    }

    next();
})

app.use((err, req, res, next) => 
{
    console.error(err);
    res.status(err.status || 500).json({error: err.message});
});

app.all('*', (req,res) => { //I like to add a catch all other not known request method, just as a defense mechanism 
    const date = new Date();
    console.log(`Date: ${date.toISOString()} - Method: ${req.method} - Parameters: ${req.params} - Body: ${JSON.stringify(req.body)}`);
    res.status(404).json({error: "Request not found"});
})

//server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on port:", PORT));