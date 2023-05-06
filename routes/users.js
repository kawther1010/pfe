const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const { uploadImage, uploadProfilePicture } = require('../config/multer')

// Importing controllers
const getController = require('../controllers/getController');
const userInfoUpdateController = require('../controllers/userInfoUpdateController');
const userPasswordUpdateController = require('../controllers/userPasswordUpdateController')
const objectCreationController = require('../controllers/objectCreationController')
const profilePictureUploadController = require('../controllers/profilePictureUploadController')
const userBidSubmitController = require('../controllers/userBidSubmitController')
const emailConfirmationController = require('../controllers/emailConfirmationController')

// Sell Page
router.get('/sell', ensureAuthenticated, getController.getSellPage);

// Profile Page
router.get('/profile', ensureAuthenticated, getController.getProfilePage);

// Account Settings Page
router.get('/account-settings', getController.getAccountSettingsPage)

// Email Confirmation Handle
router.get('/confirm/:id', emailConfirmationController.handleEmailConfirmation)

// User Info Update Handle
router.post('/info-update', ensureAuthenticated, userInfoUpdateController.handleUpdate);

// User Password Update Handle
router.post('/password-update', ensureAuthenticated, userPasswordUpdateController.handleUpdate)

// Object Creation Handle
router.post('/sell', ensureAuthenticated, uploadImage, objectCreationController.handleCreation)

// Profile Picture Upload Handle
router.post('/upload-profile-picture', ensureAuthenticated, uploadProfilePicture, profilePictureUploadController.handleUpdate)

// User Bid Handle
router.post('/bids/:id', ensureAuthenticated, userBidSubmitController.handleBidSubmit)

module.exports = router;