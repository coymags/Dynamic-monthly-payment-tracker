const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const protect = require('../middleware/authMiddleware');

//Paymongo Controller
const paymongoController = require('../paymongo/paymongoController')

// This file will execute the logic in controller file

// Getting all user
//router.get('/:id', userController.getOneUser);

// Getting one user
//router.get('/:id');


// Public Routes
// Create one user endpoint
router.post('/register', userController.createUser);

// Public Routes
// Login endpoint 
router.post('/login', userController.userLogin);

//Protected Route for payment data
router.post('/payment', protect, userController.paymentData)

//Protected Routes for Payment Status
router.post('/paymentstatus', protect, userController.paymentStatus)

//Proted Routes for latest Payment reciept
router.get('/latest_payment', protect, userController.latestPayment)

// Protected Routes (When client try to access to /home or /dashboard in browse they will redirect to login page)
router.get('/profile', protect, userController.getUser)

// Protected Routes (When client need to check if user have already a status update)
router.get('/status', protect, userController.getStatus)

// Protected Paymongo Route for Payment Intent
router.post('/payment_intents', paymongoController.userPayment)

// Protected Paymong Route for verification
router.get('/payment_verification/:payment_intent_id', paymongoController.paymentVerification)

// Updating one user
//router.patch('/:id', userController.updateUser);

// Deleting one user



module.exports = router;