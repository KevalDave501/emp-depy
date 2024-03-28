const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

async function getUsers(req, res) {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUsersWithDepartment(req, res) {
  try {
    const usersWithDepartment = await userModel.getUsersWithDepartment();
    res.status(200).json(usersWithDepartment);
  } catch (error) {
    console.error('Error fetching users with department:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserById(req, res) {
  const userId = req.params.userId;
  try {
    const user = await userModel.getUserById(userId);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// async function createUser(req, res) {
//   const userData = req.body;
//   try {
//     const userId = await userModel.createUser(userData);
//     res.status(201).json({ message: 'User created successfully', userId });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

async function updateUser(req, res) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(404).send({
        message: 'Invalid user ID'
      });
    }

    // Extract the updated user data from the request body
    const { firstName, lastName, email, password, gender, hobbies, departmentId } = req.body;

    // Perform the update operation using the userModel.updateUser function
    // Pass the user ID and updated data to the updateUser function
    const success = await userModel.updateUser(userId, { firstName, lastName, email, password, gender, hobbies, departmentId });

    // Check if the update operation was successful
    if (success) {
      res.status(200).json({ message: 'User data updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function deleteUser(req, res) {
  const userId = req.params.userId;
  try {
    const success = await userModel.deleteUser(userId);
    if (success) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function addUser(req, res) {
  try {
    const { firstName, lastName, email, password, gender, hobbies, departmentId } = req.body;
    if (!firstName || !lastName || !email || !password || !gender || !hobbies || !departmentId) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Add logic for password encryption using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt rounds

    // Call the userModel.createUser function to insert the user data into the database
    const userData = { firstName, lastName, email, password: hashedPassword, gender, hobbies, departmentId };
    const userId = await userModel.createUser(userData);

    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getUsers,
  getUserById,
  // createUser,
  updateUser,
  deleteUser,
  getUsersWithDepartment,
  addUser // Add the addUser function to the exported object
};
