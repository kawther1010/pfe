const User = require('../models/User');
const crypto = require('crypto');
const transporter = require('../config/nodemailer');

exports.handlePasswordResetRequest = async (req, res) => {
    try {
        // Generate a password reset token and store it in the user's document
        const token = crypto.randomBytes(20).toString('hex');
        const user = await User.findOneAndUpdate(
            { email: req.body.email },
            { $set: { passwordResetToken: token, passwordResetExpires: Date.now() + 3600000 } },
            { new: true }
        );

        if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgot-password');
        }

        // Send password reset email to the user's email address
        const mailOptions = {
            from: process.env.EMAIL_ADMIN,
            to: user.email,
            subject: 'Password Reset',
            text: `Hi ${user.firstName},\n\nYou are receiving this email because you (or someone else) has requested to reset your password. Please click on the following link or paste it into your browser to complete the process:\n\nhttp://${req.headers.host}/auth/password-reset/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
        };
        await transporter.sendMail(mailOptions);

        // Redirect to the success page
        req.flash('success_msg', 'You will now receive an email to reset you password');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong. Please try again later.');
        res.redirect('/forgot-password');
    }
};