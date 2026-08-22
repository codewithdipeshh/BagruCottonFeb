const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const { authenticate, isAdmin } = require("../middleware/authenticate");

router.post(
  "/create",
  authenticate,
  isAdmin,
  productController.createProduct
);

router.put(
  "/:id",
  authenticate,
  isAdmin,
  productController.updateProduct
);

router.delete(
  "/:id",
  authenticate,
  isAdmin,
  productController.deleteProduct
);

module.exports = router;