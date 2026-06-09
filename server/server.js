import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import session from './config/session.js';
import passport from './config/passport.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';

const app = express();

//Middleware
app.use(cors({
    origin: process.env.ClientURL,
    credentials: true 
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('trust proxy', 1); //Trust first proxy, needed for secure cookies when behind a proxy 

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet()); //Security headers, can be configured more if needed
app.use(compression()); //Compress responses for better performance

//Routes
app.use('/api/auth', authRoutes); 
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

app.use((req,res) => { //I like to add a catch all other not known request method, just as a defense mechanism 
    const date = new Date();
    console.log(`Date: ${date.toISOString()} - Method: ${req.method} - URL: ${req.originalUrl} - Body: ${JSON.stringify(req.body)}`);
    res.status(404).json({error: "Request not found"});
})

//server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on port:", PORT));