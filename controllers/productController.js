const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");
//const mongoose = require("mongoose");

// @desc Get All Products
// @route GET /api/v1/products
// @access Plublic
exports.getProducts = asyncHandler(async (req, res) => {
  // Filtering
  const queryStringObj = { ...req.query };
  const excludesFields = ['page', 'sort', 'limit', 'fields'];
  excludesFields.forEach((field) => delete queryStringObj[field]);

  // Apply filteration using [gte,gt,lte,lt]
  let queryStr = JSON.stringify(queryStringObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // Pagenation
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 5 || 5;
  const skip = (page - 1) * limit;
  
  // Build query
  let mongooseQuery = Product.find(JSON.parse(queryStr))
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: 'name -_id' });

  //Sorting
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else{
        mongooseQuery = mongooseQuery.sort('-createAt');

  }


//Fields Limiting
if(req.query.fields){
  const fields = req.query.fields.split(',').join(' ');
  mongooseQuery = mongooseQuery.select(fields);
}else {
  mongooseQuery = mongooseQuery.select('-__v');
}

 // Search 
 if(req.query.keyword){
  const query = {};
  query.$or = [
     {title: {$regex: req.query.keyword, $options: 'i'}},
     {description: {$regex: req.query.keyword, $options: 'i'}},
  ];
  mongooseQuery = mongooseQuery.find(query);
 }


// Execute query
  const products = await mongooseQuery;

  res.status(200).json({ results: products.length, page, data: products });
});

// @desc Get specific Product
// @route GET /api/v1/products/:id
// @access Plublic
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) {
    // res.status(404).json({ msg: `No product for this id: ${id}` });
    return next(new ApiError(`No product found for this id: ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Create product
// @route POST /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc Update product
// @route POST /api/v1/products/:id
// @access Private

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    // res.status(404).json({ msg: `No product for this id: ${id}` });
    return next(new ApiError(`No product found for this id: ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Delete product
// @route DELETE /api/v1/products/:id
// @access Private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    // res.status(404).json({ msg: `No product found for this id: ${id}` });
    return next(new ApiError(`No product found for this id: ${id}`, 404));
  }
  res.status(204).send();
});
