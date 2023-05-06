const express = require('express');
const router = express.Router();
const passport = require('passport')

// Importing controllers
const getController = require('../controllers/getController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const logoutController = require('../controllers/logoutController');
const passwordResetRequestController = require('../controllers/passwordResetRequestController');
const passwordResetController = require('../controllers/passwordResetController');
const deleteObjectAdmin= require('../controllers/deleteObjectAdminController');
const deleteUserAdmin= require('../controllers/deleteUserAdminController');

// Login Page
router.get('/login', getController.getLoginPage);

// Register Page
router.get('/register', getController.getRegisterPage);

// Register Handle
router.post('/register', registerController.handleRegister);

// Login Handle
router.post('/login', loginController.handleLogin);

// Logout Handle
router.get('/logout', logoutController.handleLogout);

// Google OAuth Handle
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Google OAuth Callback Handle
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

// Password Reset Request Page
router.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
});

// Password Reset Request Handle
router.post('/forgot-password', passwordResetRequestController.handlePasswordResetRequest);

// Password Reset Page
router.get('/password-reset/:token', (req, res) => {
    const token = req.params.token;
    res.render('password-reset', { token });
})

// Password Reset Request Handle
router.post('/password-reset/:token', passwordResetController.handlePasswordReset);

// Dashboard Page
router.get('/dashboard', getController.getDashboardPage);
module.exports = router;