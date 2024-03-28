const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for getting all users
router.get('/', userController.getUsers);

// Route for getting a specific user by ID
router.get('/:userId', userController.getUserById);

// Route for creating a new user
router.post('/', userController.addUser); // Add this line to define the route for adding a new user

// Route for updating user data by ID using a POST request
router.post('/:userId', userController.updateUser);

// Route for deleting a user by ID
router.delete('/:userId', userController.deleteUser);

// Route for getting users with department
router.get('/withDepartment', userController.getUsersWithDepartment);

module.exports = router;
