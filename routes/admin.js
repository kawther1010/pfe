const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const passport = require('passport');

// Importing Controllers
const getController = require('../controllers/getController');
const postFaqsAdmin= require('../controllers/postFaqsAdmin');
const deleteFaqsAdmin= require('../controllers/deleteFaqsAdmin');
const deleteObjectAdmin= require('../controllers/deleteObjectAdminController');
const deleteUserAdmin= require('../controllers/deleteUserAdminController');
const postTermsAdmin = require('../controllers/postTermsAdmin');
const deleteTermsAdmin = require('../controllers/deleteTermAdmin');
const postPrivacyAdmin= require('../controllers/postPrivacyAdmin');
const editFaqsAdmin= require('../controllers/editFaqsAdmin');
const editTermAdmin= require('../controllers/editTermAdmin');


   /*OBJECTS DIR*/

// GET objects Page for admin
router.get('/objects', getController.getObjectsAdminPage);

// GET object detail Page for admin
router.get('/objects/buyAdmin/:id', getController.getBuyAdminPage);

// delete object Page for admin
router.post('/objects/buyAdmin/:id', deleteObjectAdmin.postDeleteObjectAdmin);

  /*USERS DIR*/

// users Page for admin
router.get('/users', getController.getUsersAdminPage);

// user detail Page for admin
router.get('/users/profileAdmin/:id', getController.getProfileAdminPage);

// delete user Page for admin
router.post('/users/profileAdmin/:id', deleteUserAdmin.postDeleteUserAdmin);


  /*FAQS DIR*/

// FAQs Page for Admin
router.get('/faqsAdmin', getController.getFAQsAdminPage);

// add new FAQs for admin
router.post('/faqsAdmin', postFaqsAdmin.postNewFaqsAdmin);

// FAQs delete Page for admin
router.get('/faqsAdmin/delete/:id', getController.getFaqAdminDelete);

// Delete FAQs for Admin
router.post('/faqsAdmin/delete/:id', deleteFaqsAdmin.deleteFaqsAdmin);

// GET FAQs edit Page for admin
router.get('/faqsAdmin/edit/:id', getController.getFaqAdminEdit);

// Edit FAQs for Admin
router.post('/faqsAdmin/edit/:id', editFaqsAdmin.editFaqsAdmin);

  /*Terms of use DIR*/

// Terms of Use Page for Admin
router.get('/terms-of-use-admin', getController.getTermsOfUseAdminPage);

// add new Terms for admin
router.post('/terms-of-use-admin', postTermsAdmin.postTermsAdmin);

// GET Terms delete Page for admin
router.get('/terms-of-use-admin/delete/:id', getController.getTermsOfUseAdminDeletePage);

// delete Terms for Admin
router.post('/terms-of-use-admin/delete/:id', deleteTermsAdmin.deleteTermsAdmin);

// GET Terms delete Page for admin
router.get('/terms-of-use-admin/edit/:id', getController.getTermsOfUseAdminEditPage);

// Edit Terms for Admin
router.post('/terms-of-use-admin/edit/:id', editTermAdmin.editTermAdmin);


  /*Privacy and Policy DIR*/

// Privacy and Policy Page for Admin
router.get('/privacy-policy-admin', getController.getPolicyPrivacyAdminPage);

// Post new Privacy and Policy for Admin
router.post('/privacy-policy-admin', postPrivacyAdmin.postPrivacyAdmin);



module.exports = router;