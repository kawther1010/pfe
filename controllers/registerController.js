const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const transporter = require('../config/nodemailer');
require('dotenv').config()

// Handle register request
exports.handleRegister = (req, res) => {
    const { firstName, lastName, email, password, passwordRepeated } = req.body;
    let errors = [];

    // Check required fields
    if (!firstName || !lastName || !email || !password || !passwordRepeated) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match
    if (password !== passwordRepeated) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstName,
            lastName,
            email,
            password,
            passwordRepeated,
        });
    } else {
        // Validation passed
        User.findOne({ email: email }).then((user) => {
            if (user) {
                // User exists
                errors.push({ msg: 'Email is already registered' });
                res.render('register', {
                    errors,
                    firstName,
                    lastName,
                    email,
                    password,
                    passwordRepeated,
                });
            } else {
                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password,
                    isVerified: false,
                });
                // Hash Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // Set password to hashed
                        newUser.password = hash;
                        // Save user
                        newUser
                            .save()
                            .then((user) => {
                                // Send verification email

                                const mailOptions = {
                                    from: process.env.EMAIL_ADMIN,
                                    to: newUser.email,
                                    subject: 'Verify your email',
                                    text: `Please click on the following link to verify your email:
                                            http://${req.headers.host}/users/confirm/${user._id}`,
                                };

                                transporter.sendMail(mailOptions, (err, info) => {
                                    if (err) throw err;
                                    console.log(`A verification email has been sent to the user: ${info.response}`);
                                    req.flash(
                                        'success_msg',
                                        'A verification email has been sent to your email address'
                                    );
                                    // 
                                    res.redirect('/auth/login');
                                });
                            })
                            .catch((err) => console.log(err));
                    });
                });
            }
        });
    }
};  