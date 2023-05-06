const User = require('../models/User');

exports.handleEmailConfirmation = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            req.flash('error_msg', 'Invalid confirmation link');
            res.redirect('/auth/login');
            return;
        }

        if (user.emailConfirmed) {
            req.flash('success_msg', 'Email already confirmed');
            res.redirect('/auth/login');
            return;
        }

        user.emailConfirmed = true;
        await user.save();

        req.flash('success_msg', 'Email confirmed successfully, please login');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Something went wrong');
        res.redirect('/auth/login');
    }
};
