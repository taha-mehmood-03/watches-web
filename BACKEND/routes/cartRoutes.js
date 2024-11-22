const express = require('express');
const router = express.Router();
const Selectedwatch = require('../modals/selectedwatch');

// Add watch to cart
router.post('/addcart', async (req, res) => {
  const { id, name, price, images, userId, quantity } = req.body;

  try {
    const existingWatch = await Selectedwatch.findOne({ name, userId });
    if (existingWatch) {
      return res.status(409).send({ error: "Watch is already in the cart" });
    }

    const cartedWatch = new Selectedwatch({ id, name, price, images, userId, quantity });
    await cartedWatch.save();
    res.status(201).send({ message: "Watch added to cart successfully" });
  } catch (error) {
    res.status(500).send({ error: "Error adding watch to cart" });
  }
});

// Get cart items for a user
router.get('/carting', async (req, res) => {
  const { userId } = req.query;

  try {
    const cartWatches = await Selectedwatch.find({ userId });
    res.status(200).json(cartWatches);
  } catch (error) {
    res.status(500).send({ message: "Error fetching cart data" });
  }
});

// Delete watch from cart
router.delete('/deleting', async (req, res) => {
  const { name } = req.body;

  try {
    const deletedWatch = await Selectedwatch.findOneAndDelete({ name });
    if (deletedWatch) {
      res.status(200).send({ message: "Watch deleted successfully" });
    } else {
      res.status(404).send({ message: "Watch not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting watch from cart" });
  }
});

// Update cart quantity
router.put('/updatecart', async (req, res) => {
  const { name, userId, quantity } = req.body;

  try {
    const updatedWatch = await Selectedwatch.findOneAndUpdate(
      { name, userId },
      { quantity },
      { new: true }
    );
    if (updatedWatch) {
      res.status(200).send({ message: "Quantity updated successfully", updatedWatch });
    } else {
      res.status(404).send({ error: "Watch not found for this user" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error updating watch quantity" });
  }
});

module.exports = router;
