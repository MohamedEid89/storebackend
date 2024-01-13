const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");

// @desc Get All Categories
// @route GET /api/v1/categories
// @access Plublic
exports.getCategories = asyncHandler(async (req, res) => {
  // Pagenation
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 5 || 5;

  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc Get specific Category
// @route GET /api/v1/categories/:id
// @access Plublic
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    // res.status(404).json({ msg: `No category for this id: ${id}` });
    return next(new ApiError(`No category found for this id: ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc Create category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc Update category
// @route POST /api/v1/categories/:id
// @access Private

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    // res.status(404).json({ msg: `No category for this id: ${id}` });
    return next(new ApiError(`No category found for this id: ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc Delete category
// @route DELETE /api/v1/categories/:id
// @access Private

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    // res.status(404).json({ msg: `No Category found for this id: ${id}` });
    return next(new ApiError(`No category found for this id: ${id}`, 404));
  }
  res.status(204).send();
});
