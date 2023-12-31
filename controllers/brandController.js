const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const ApiError = require("../utils/apiError");

// @desc Get All Brands
// @route GET /api/v1/brands
// @access Plublic
exports.getBrands = asyncHandler(async (req, res) => {
  // Pagenation
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 5 || 5;
  const skip = (page - 1) * limit;
  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

// @desc Get specific Brand
// @route GET /api/v1/brands/:id
// @access Plublic
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    // res.status(404).json({ msg: `No brand for this id: ${id}` });
    return next(new ApiError(`No brand found for this id: ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Create Brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc Update Brand
// @route POST /api/v1/brands/:id
// @access Private

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    // res.status(404).json({ msg: `No brand for this id: ${id}` });
    return next(new ApiError(`No brand found for this id: ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Delete Brand
// @route DELETE /api/v1/brands/:id
// @access Private

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    // res.status(404).json({ msg: `No brand found for this id: ${id}` });
    return next(new ApiError(`No brand found for this id: ${id}`, 404));
  }
  res.status(204).send();
});
