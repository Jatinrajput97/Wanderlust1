const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reviewSchema= new Schema({
    comment:String,
    rating:{
    type:Number,
    min:1,
    max:5,
    },
    createdAt:{
        Type:Date,
         
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
      }

})
module.exports=mongoose.model("Review", reviewSchema);
