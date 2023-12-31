const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategory = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");

// Get categoryId from Params Id
exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc Create subCategory
// @route POST /api/v1/categories
// @access Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// Nested Route
// GET  /api/v1/categories/:categoryId/subcategories

exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
};
// @desc Get All SubCategories
// @route GET /api/v1/subcategories
// @access Plublic
exports.getSubCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 5 || 5;
  const skip = (page - 1) * limit;
  //console.log(req.params);

  const subCategories = await SubCategory.find(req.filterObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  // .populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc Get specific SubCategory
// @route GET /api/v1/suncategories/:id
// @access Plublic
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    return next(new ApiError(`No subcategory found for this id: ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Update Subcategory
// @route POST /api/v1/subcategories/:id
// @access Private

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subCategory) {
    // res.status(404).json({ msg: `No category for this id: ${id}` });
    return next(new ApiError(`No subcategory found for this id: ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Delete category
// @route DELETE /api/v1/categories/:id
// @access Private

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    // res.status(404).json({ msg: `No Category found for this id: ${id}` });
    return next(new ApiError(`No subcategory found for this id: ${id}`, 404));
  }
  res.status(204).send();
});
