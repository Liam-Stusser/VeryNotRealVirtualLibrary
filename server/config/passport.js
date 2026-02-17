import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { findUserByUsername, findUserById } from '../models/userModel.js'; 

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await findUserByUsername(username); 
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const match = await bcrypt.compare(password, user.password_hash);
            if (!match) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

//Store users id in session data
passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
})

export default passport;