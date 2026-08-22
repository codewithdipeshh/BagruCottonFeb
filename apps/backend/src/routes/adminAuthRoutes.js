
const express = require("express");
const router = express.Router();
const { adminLogin, forgotPassword, resetPassword, setupAdmin } = require("../controller/adminAuthController");
const reviewController = require("../controller/review.controller");
const { authenticate, isAdmin } = require("../middleware/authenticate");


router.post("/login", adminLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/setup-admin", setupAdmin);

// Admin review management routes
router.get("/reviews", authenticate, isAdmin, reviewController.adminGetAllReviews);
router.delete("/reviews/:reviewId", authenticate, isAdmin, reviewController.adminDeleteReview);

module.exports = router;