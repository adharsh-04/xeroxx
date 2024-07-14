const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user.js'); // Ensure the path to the User model is correct

const userApp = express.Router();

// Test route
userApp.get('/test', (req, res) => {
  res.send({ message: "request from user" });
});

// Register a new user
userApp.post('/register', async (req, res) => {
  try {
    const { type, username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      type,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Login route
userApp.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: 'Invalid username or password' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = userApp;
