const mongoose = require("mongoose");

const watchesSchema =new mongoose.Schema({
    id:{type:Number ,required:true},
    name:{type:String,required :true},
    price:{type:String,required :true},
    images:{type:[String],required :true}
})

const Watches  = mongoose.model("tahawatches",watchesSchema);
module.exports  = Watches;