const express = require('express');
const router = express.Router();
const User = require('../modals/user'); // Adjust the path as needed
const jwt = require('jsonwebtoken');

const secretKey = "d#&s8F$A5^yZ6tW*Rk@3pV!9nC7jG2mL4"; // Your JWT secret key

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).send({ message: "Email not found" });
    }
    if (user.password !== password) {
      return res.status(401).send({ message: "Incorrect password" });
    }

    const { userId, firstName, lastName } = user;
    const token = jwt.sign({ userId, firstName, lastName }, secretKey, { expiresIn: '1h' });

    res.send({ message: "Logged in successfully", userId, firstName, lastName, token });
  } catch (error) {
    res.status(500).send({ message: "An unexpected error occurred" });
  }
});

// User signup route
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const userId = Math.floor(1000000000000000 + Math.random() * 900000000000000);
  const newUser = new User({ userId, firstName, lastName, email, password });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully", userId });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

module.exports = router;
