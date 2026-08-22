const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");

router.get("/", productController.findAllProducts);
router.get("/id/:id", productController.findProductById);

module.exports = router;