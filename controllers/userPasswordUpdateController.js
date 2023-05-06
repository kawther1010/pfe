const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Handle password update request
exports.handleUpdate = async (req, res) => {
    const { currentPassword, newPassword, newPasswordRepeated } = req.body;
    const userId = req.user.id; // assuming authenticated user is available in req.user object

    try {
        // Get user from database
        const user = await User.findById(userId);
        // Check if current password matches
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            req.flash('error_msg', 'Current password is incorrect');
            return res.redirect('/users/account-settings');
        }

        // Check if new password and confirmation match
        if (newPassword !== newPasswordRepeated) {
            req.flash('error_msg', 'New password and confirmation do not match');
            return res.redirect('/users/account-settings');
        }

        // Check new password length
        if (newPassword.length < 6) {
            req.flash('error_msg', 'Password should be at least 6 characters');
            return res.redirect('/users/account-settings');
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        // Update user's password in database
        await User.findByIdAndUpdate(userId, { password: hash });

        req.flash('success_msg', 'Password updated successfully');
        res.redirect('/users/profile');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'An error occurred. Please try again.');
        res.redirect('/users/account-settings');
    }
};
