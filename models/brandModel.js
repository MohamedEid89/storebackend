const mongoose = require("mongoose");
// 1- Create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [1, "Too short brand name"],
      maxlength: [33, "Too long brand name"],
    },
    // A and B => shoping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

// 2- Create model
const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
