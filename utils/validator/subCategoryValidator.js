const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validationMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("SubCategory name required")
    .isLength({ min: 3 })
    .withMessage("Too short SubCategory name")
    .isLength({ max: 33 })
    .withMessage("Too long SubCategory name"),
  check("category")
    .notEmpty()
    .withMessage("Subcategory must be belong to main category")
    .isMongoId()
    .withMessage("Invalid Category id format"),
  validationMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  check("name")
    .notEmpty()
    .withMessage("SubCategory name required")
    .isLength({ min: 3 })
    .withMessage("Too short SubCategory name")
    .isLength({ max: 33 })
    .withMessage("Too long SubCategory name"),
  validationMiddleware,
];
exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validationMiddleware,
];
