const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const UserAddress = mongoose.model("userAddress", userAddressSchema);

module.exports = UserAddress;
