const express = require('express');
const router = express.Router();
const paymentController = require('../controller/payment.controller');

// Yeh route Razorpay ka naya order create karega
// API banegi: POST http://localhost:5454/api/payments/create
router.post('/create', paymentController.createPaymentLink);

module.exports = router;