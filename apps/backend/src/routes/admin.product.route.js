const express = require("express");
const router = express.Router();
const adminProductController = require("../controller/admin.product.controller");
const { authenticate } = require("../middleware/authenticate");
const { uploadCloud } = require("../config/cloudinaryConfig");

router.post(
  "/create",
  authenticate,
  uploadCloud.array("images", 5), 
  adminProductController.addProduct
);

router.get(
  "/all",
  authenticate,
  adminProductController.getAllProducts
);

router.delete(
  "/:id",
  authenticate,
  adminProductController.deleteProduct
);

module.exports = router;