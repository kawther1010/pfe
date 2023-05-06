const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Importing Controllers
const getController = require('../controllers/getController');
const postFaqsAdmin= require('../controllers/postFaqsAdmin');
const deleteFaqsAdmin= require('../controllers/deleteFaqsAdmin');

// Home Page
router.get('/', getController.getHomePage);

// FAQs Page
router.get('/faqs', getController.getFAQsPage);

// Terms of Use Page
router.get('/terms-of-use', getController.getTermsOfUsePage);

// Privacy Policy Page
router.get('/privacy-policy', getController.getPrivacyPolicyPage);

// Category Page
router.get('/category/:categoryName', getController.getCategoryPage);

// Buy Page
router.get('/objects/:id', getController.getBuyPage);

module.exports = router