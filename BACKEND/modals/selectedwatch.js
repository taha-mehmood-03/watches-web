const mongoose = require("mongoose");

const watchSchema = new mongoose.Schema({

  name: { type: String, required: true },
  price: { type: String, required: true },
  images: { type: [String], required: true },
  userId: { type: String, required: true },
  quantity:{type:Number,required: true}

});

const selectedwatch = mongoose.model("tahacart", watchSchema);
module.exports = selectedwatch;