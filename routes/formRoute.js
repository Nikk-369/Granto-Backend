const express = require('express');
const router = express.Router();
const { submitForm, submitUTR } = require('../controllers/formController');

// Route for submitting the form
router.post('/submit', submitForm);

// Route for submitting UTR number
router.post('/submit-utr', submitUTR);

module.exports = router;
