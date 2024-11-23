const express = require('express');
const router = express.Router();
const Watches = require('../modals/watches');

// Add a new watch
router.post("/Ordering", async (req, res) => {
  try {
    const newWatch = new Watches(req.body);
    await newWatch.save();
    res.status(201).send({ message: "Watch created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error adding watch to the database" });
  }
});

// Get all watches
router.get('/Ordering', async (req, res) => {
  try {
    const watches = await Watches.find();
    res.status(200).json(watches);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving watches' });
  }
});

module.exports = router;
