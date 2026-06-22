const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const { authenticate } = require("../middleware/authenticate");


// Get All Products
router.get(
  "/",
  authenticate,
  productController.findAllProducts
);

// Get Product By Id
router.get(
  "/id/:id",
  authenticate,
  productController.findProductById
);

module.exports = router;