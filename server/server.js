import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from './config/session.js';
import passport from './config/passport.js';

import authRoutes from './routes/authRoutes.js';
//import userRoutes from './routes/user.routes.js';
//import adminRoutes from './routes/admin.routes.js';
import cors from 'cors';

const app = express();

//Middleware
app.use(cors({
    origin: 'http://localhost:5173', //change later to actual frontend url
    credentials: true 
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/auth', authRoutes); 
//app.use('/api/user', userRoutes);
//app.use('/api/admin', adminRoutes);

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