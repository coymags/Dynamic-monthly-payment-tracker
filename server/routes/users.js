const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const protect = require('../middleware/authMiddleware');

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

// Protected Routes (When client try to access to /home or /dashboard in browse they will redirect to login page)
router.get('/profile', protect, userController.getUser, (req, res) => {
    res.json(req.user)
})

// Updating one user
//router.patch('/:id', userController.updateUser);

// Deleting one user



module.exports = router;