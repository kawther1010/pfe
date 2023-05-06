const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const transporter = require('../config/nodemailer');

// Load User Model
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: Math.random().toString(36).slice(-8),
            emailConfirmed: true
        }

        try {
            let user = await User.findOne({ email: profile.emails[0].value })

            if (user) {
                done(null, user)
            } else {

                const mailOptions = {
                    from: process.env.EMAIL_ADMIN,
                    to: profile.emails[0].value,
                    subject: 'Your password for our website',
                    text: `Hello ${newUser.firstName},\n\nThank you for signing up with us! Your randomly generated password is: ${newUser.password}\n\nPlease log in and change it to something more memorable as soon as possible.\n\nBest regards,\nThe Website Team`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(`Email sent to ${profile.emails[0].value}: ${info.response}`);
                    }
                });

                const salt = await bcrypt.genSalt(10);
                newUser.password = await bcrypt.hash(newUser.password, salt);
                user = await User.create(newUser)

                done(null, user)
            }

        } catch (error) {
            console.log(error);
        }

    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};