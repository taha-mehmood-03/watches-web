const express = require("express");
const router = express.Router();
const User = require("./user"); // Adjust the path as needed

router.post("/login", async (req, res) => {
  console.log("Login request received:", req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();
    console.log("USER", user);

    if (!user) {
      console.log("User not found");
      return res.status(401).send({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      console.log("Invalid email or password");
      return res.status(401).send({ message: "Invalid email or password" });
    }

    console.log("Logged in successfully");
    res.send({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Error logging in" });
  }
});

router.post("/signup", async (req, res) => {
  console.log("Signup request received:", req.body);
  const { firstName, lastName, email, password } = req.body;

  try {
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    console.log("User created successfully");
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send({ message: "Error creating user" });
  }
});

module.exports = router;
