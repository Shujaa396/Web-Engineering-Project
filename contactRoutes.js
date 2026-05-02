const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Public route to submit contact form
router.post('/', contactController.submitContactForm);
// Admin route to see messages
router.get('/', contactController.getContactSubmissions);

module.exports = router;