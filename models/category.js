const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlenght: 32,
    },
   
  },
  { timestamps: true }
);



module.exports = mongoose.model('Category', userSchema);