const express = require("express");
const router = express.Router();
const User = require("./modals/user"); // Adjust the path as needed
const Watches = require("./modals/watches")
const Selectedwatch =require("./modals/selectedwatch")
const UserAddress=require("./modals/info")
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = "d#&s8F$A5^yZ6tW*Rk@3pV!9nC7jG2mL4"; // Your JWT secret key

router.post('/login', async (req, res) => {
  console.log("Login request received:", req.body);
  const { email, password } = req.body;
  
  try {
    // Check if user exists by email
    const user = await User.findOne({ email }).exec();

    if (!user) {
      console.log("Invalid email address");
      return res.status(400).send({ message: "Email not found" });
    }

    // Check if password matches
    if (user.password !== password) {
      console.log("Invalid password");
      return res.status(401).send({ message: "Incorrect password" });
    }

    const { userId, firstName, lastName } = user;

    // Generate a JWT token
    const token = jwt.sign({ userId, firstName, lastName }, secretKey, { expiresIn: '1h' });

    // Send user data including the token and userId in the response
    res.send({ message: "Logged in successfully", userId, firstName, lastName, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "An unexpected error occurred, please try again later" });
  }
});


router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`, req.body);
  next();
});

router.post("/signup", async (req, res) => {
  try {
    console.log("Signup request received:", req.body);
    
    const { firstName, lastName, email, password } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        message: "All fields are required" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "Email already registered" 
      });
    }

    const userId = Math.floor(1000000000000000 + Math.random() * 900000000000000);
    const newUser = new User({
      userId,
      firstName,
      lastName,
      email,
      password // Note: In production, hash the password
    });

    await newUser.save();
    console.log("User created successfully");
    res.status(201).json({ 
      message: "User created successfully",
      userId: userId 
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ 
      message: "Error creating user",
      error: error.message 
    });
  }
});

router.post("/Ordering",async(req, res)=>{
// const [{id ,name , price ,images}] = req.body;
console.log("requestbody",req.body);
try{
const newWatches =  await   new Watches(req.body);
newWatches.save();

res.status(201).send({ message: "watches created successfully" });
}
catch(error){
    console.error("Error during adding data to database",error);
    res.status(500).send({ message: "error during adding" });
}
})


//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}


// router.get("/Ordering",async(req, res)=>{
//     // const [{id ,name , price ,images}] = req.body;
    
//     try{
//         const watches = await Watches.find()
//      res.status(200).json(watches);
//     }
//     catch(error){
//         console.error("Error receiving data from database",error);
//         res.status(500).send({ message: "error during adding" });
//     }

//     })
router.get('/Ordering', async (req, res) => {
  try {
    const watches = await Watches.find();
    res.status(200).json(watches);
  } catch (error) {
    console.error('Error receiving data from database', error);
    res.status(500).send({ message: 'Error retrieving watches' });
  }
});

//{{{{}}{}{{{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{{{{}}}}}}}}}}




router.post('/addcart', async (req, res) => {
  const { id, name, price, images, userId, quantity } = req.body;

  try {
    // Check if the watch is already in the cart for this user
    const existingWatch = await Selectedwatch.findOne({ name, userId });

    if (existingWatch) {
      return res.status(409).send({ error: "Watch is already in the cart for this user" });
    }

    // Create a new carted watch entry
    const cartedWatch = new Selectedwatch({ id, name, price, images, userId, quantity });
    await cartedWatch.save();

    res.status(201).send({ message: "Watch carted successfully" });
  } catch (error) {
    console.error("Error during carting data to database", error);
    res.status(500).send({ error: "An error occurred while carting the watch" });
  }
});
    
    

    router.get("/carting", async (req, res) => {
      const { userId } = req.query; // Extract userId from query parameters
  
      try {
          const cartWatches = await Selectedwatch.find({ userId: userId });
          res.status(200).json(cartWatches);
      } catch (error) {
          console.error("Error receiving data from database", error);
          res.status(500).send({ message: "Error fetching cart data" });
      }
  });




router.delete("/deleting" , async(req,res)=>{
  console.log(req.body)
  try{
    const {name} = req.body;
     const  deletedwatch = await Selectedwatch.findOneAndDelete({name})
     if (deletedwatch) {
      res.status(200).send({ message: "Watch deleted successfully" });
    } else {
      res.status(404).send({ message: "Watch not found" });
    }

  }
  catch(error){
    console.error("Error deleting data from database",error);
    res.status(500).send({ message: "error during deleting" });
  }

})





router.put("/updatecart", async (req, res) => {
  const { name, userId, quantity } = req.body;
  try {
    const updatedWatch = await Selectedwatch.findOneAndUpdate(
      { name: name, userId: userId },
      { quantity: quantity },
      { new: true }
    );
    if (updatedWatch) {
      res.status(200).send({ message: "Quantity updated successfully", updatedWatch });
    } else {
      res.status(404).send({ error: "Watch not found for this user" });
    }
  } catch (error) {
    console.error("Error updating quantity", error);
    res.status(500).send({ error: "An error occurred while updating the quantity" });
  }
});

router.post('/AddAddress', async (req, res) => {
  const { userId, firstName, lastName, postalCode, phone, address } = req.body;

  try {
    // Create a new address document
    const newAddress = new UserAddress({
      userId,
      firstName,
      lastName,
      postalCode,
      phone,
      address
    });

    // Save the new address to the database
    await newAddress.save();

    // Optionally, you can respond with the saved address information
    res.status(201).json(newAddress);
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: "Failed to add address" });
  }
});













module.exports = router;
