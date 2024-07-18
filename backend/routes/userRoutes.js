const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Get a list of all users
router.get('/', usersController.getAllUsers);

// Get a single user by ID
router.get('/:id', usersController.getUserById);

// Create a new user
router.post('/', usersController.createUser);

// Update an existing user
router.put('/:id', usersController.updateUser);

// Delete a user
router.delete('/:id', usersController.deleteUser);

module.exports = router;
