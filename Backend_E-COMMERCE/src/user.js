const mongoose = require('mongoose');
console.log("now this is user.js")
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('tahacollection', userSchema);

module.exports = User;
