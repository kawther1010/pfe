const passport = require('passport');
const User = require('../models/User');

// Handle login request
exports.handleLogin = async (req, res, next) => {
    try {
        // Check if user's email is confirmed
        const user = await User.findOne({ email: req.body.email });

        if((req.body.email == process.env.EMAIL_ADMIN) && (req.body.password == process.env.PASSWORD_ADMIN_AUTH)){

            //'vintagesalepublic@gmail.com'   "12390909009"
            return res.redirect('dashboard');

        } else if (!user || !user.emailConfirmed) {

            // User's email is not confirmed, show an error message
            req.flash('error_msg', 'Please confirm your email address to log in');
            res.redirect('/auth/login');
            return;

        } else {

            // User's email is confirmed, continue with authentication
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true
        })(req, res, next);


        }
    } catch (error) {
        console.error(error);
        res.redirect('/auth/login');
    }
};
