const express = require('express');
const router = express.Router();
const UserAddress = require('../modals/info');

// Add user address
router.post('/AddAddress', async (req, res) => {
  const { userId, firstName, lastName, postalCode, phone, address } = req.body;

  try {
    const newAddress = new UserAddress({ userId, firstName, lastName, postalCode, phone, address });
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ error: "Failed to add address" });
  }
});

module.exports = router;
