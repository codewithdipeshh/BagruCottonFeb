const express = require("express");
const router = express.Router();

const reviewController = require("../controller/review.controller");
const { authenticate, isAdmin } = require("../middleware/authenticate");
const { uploadReviewImages } = require("../config/cloudinaryConfig");


router.post("/create", authenticate, uploadReviewImages.array('images', 5), reviewController.createReview);
router.get("/all", reviewController.getGlobalReviews);
router.get("/product/:productId", reviewController.getAllReview);
router.get("/product/:productId/summary", reviewController.getReviewSummary);
router.get("/product/:productId/stats", reviewController.getReviewStats);
router.get("/product/:productId/user", authenticate, reviewController.getUserReview);
router.put("/:reviewId/helpful", authenticate, reviewController.markReviewHelpful);
router.put("/:reviewId", authenticate, uploadReviewImages.array('images', 5), reviewController.updateReview);

// DELETE ROUTE - For customers (own reviews only)
router.delete("/:reviewId", authenticate, reviewController.deleteReview);

// ADMIN DELETE ROUTE - For admin panel (can delete any review)
router.delete("/:reviewId/delete", authenticate, isAdmin, reviewController.adminDeleteReview);

module.exports = router;