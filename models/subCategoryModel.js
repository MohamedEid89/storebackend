const mongoose = require("mongoose");

// Create Schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [33, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

// Create Model
const subCategoryModel = mongoose.model("SubCategory", subCategorySchema);

module.exports = subCategoryModel;
