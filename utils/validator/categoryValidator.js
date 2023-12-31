const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id format"),
  validationMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 33 })
    .withMessage("Too long category name"),
  validationMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id format"),
  check("name")
    .notEmpty()
    .withMessage("Category name required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 33 })
    .withMessage("Too long category name"),
  validationMiddleware,
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id format"),
  validationMiddleware,
];
