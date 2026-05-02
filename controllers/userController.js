const userModel = require('../models/userModel');

// Add user
const addUser = async (req, res) => {
  try {
    const { name, email, phone, address, city, postal } = req.body;
    
    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const user = await userModel.addUser({ name, email, phone, address, city, postal });
    
    if (user.error) {
      return res.status(400).json(user);
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error adding user' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userModel.getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { name, phone, address, city, postal } = req.body;

    const user = await userModel.updateUser(email, { name, phone, address, city, postal });
    
    if (user.error) {
      return res.status(404).json(user);
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await userModel.deleteUser(email);
    
    if (result.error) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

// Admin login
const adminLogin = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const isValid = userModel.verifyAdmin(username, password);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ 
      message: 'Login successful',
      token: 'admin_token_' + Date.now(),
      username: username
    });
  } catch (error) {
    res.status(500).json({ error: 'Login error' });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
  adminLogin
};
