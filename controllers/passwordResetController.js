const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.handlePasswordReset = async (req, res) => {
    try {
        const token = req.params.token;
        const { password, confirmPassword } = req.body;

        // Check if the password and confirm password fields match
        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect(`/reset-password/${token}`);
        }

        // Verify token and retrieve user
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            req.flash('error', 'Invalid or expired token');
            return res.redirect('/auth/forgot-password');
        }

        // Hash the new password and update user's password and remove passwordResetToken
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        req.flash('success_msg', 'Your password has been reset successfully!');
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong, please try again');
        res.redirect(`/reset-password/${token}`);
    }
};
