const reviewService = require("../services/review.service");
const { uploadCloud } = require("../config/cloudinaryConfig");
const Review = require("../models/review.model");

const createReview = async (req, res) => {
    try {
        const user = req.user;

        // Validate required fields
        if (!req.body.productId) {
            return res.status(400).send({
                error: "Product ID is required"
            });
        }

        if (!req.body.rating) {
            return res.status(400).send({
                error: "Rating is required"
            });
        }

        if (!req.body.review || req.body.review.trim().length < 3) {
            return res.status(400).send({
                error: "Review must be at least 3 characters"
            });
        }

        // Handle images using Cloudinary
        let images = [];
        
        // Handle uploaded files from Cloudinary
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.secure_url || file.path);
        }

        const reviewData = {
            productId: req.body.productId,
            review: req.body.review,
            rating: parseInt(req.body.rating),
            images: images
        };

        const review = await reviewService.createReview(reviewData, user);

        return res.status(201).send(review);

    } catch (error) {
        // Handle duplicate key error (user already reviewed)
        if (error.code === 11000) {
            return res.status(400).send({
                error: "You have already reviewed this product"
            });
        }
        
        return res.status(500).send({
            error: error.message,
        });
    }
};

// NAYA FUNCTION: Frontend ke Landing Page ke liye (Saare reviews laane ke liye)
const getGlobalReviews = async (req, res) => {
    try {
        // Yeh function aapko service mein banana hoga
        const reviews = await reviewService.getAllReviewsGlobal(); 

        return res.status(200).send(reviews);
    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

const getAllReview = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { rating, sort, page, limit } = req.query;

        const options = {
            rating,
            sort,
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10
        };

        const reviews = await reviewService.getAllReview(productId, options);

        return res.status(200).send(reviews);

    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

const getReviewSummary = async (req, res) => {
    try {
        const productId = req.params.productId;

        const summary = await reviewService.getReviewSummary(productId);

        return res.status(200).send(summary);

    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

const getReviewStats = async (req, res) => {
    try {
        const productId = req.params.productId;

        const stats = await reviewService.getReviewStats(productId);

        return res.status(200).send(stats);

    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

const markReviewHelpful = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const user = req.user;

        const review = await reviewService.markReviewHelpful(reviewId, user._id);

        return res.status(200).send(review);

    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

const getUserReview = async (req, res) => {
    try {
        const productId = req.params.productId;
        const user = req.user;

        const review = await reviewService.getUserReview(productId, user._id);

        if (!review) {
            return res.status(404).send({
                error: "Review not found"
            });
        }

        return res.status(200).send(review);

    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const user = req.user;

        // Handle existing images that should be kept
        let existingImages = [];
        if (req.body.existingImages) {
            try {
                existingImages = JSON.parse(req.body.existingImages);
                if (!Array.isArray(existingImages)) {
                    existingImages = [existingImages];
                }
            } catch (e) {
                existingImages = [];
            }
        }

        // Handle new uploaded files
        let newImages = [];
        if (req.files && req.files.length > 0) {
            newImages = req.files.map(file => file.secure_url || file.path);
        }

        // Combine existing and new images
        const images = [...existingImages, ...newImages];

        const reviewData = {
            ...req.body,
            images: images
        };

        const review = await reviewService.updateReview(reviewId, reviewData, user);

        return res.status(200).send(review);

    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

// Delete review - for both admin and customer (own reviews)
const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.user._id || req.user.id;
        
        // Check if user is the review owner
        const Review = require('../models/review.model');
        const review = await Review.findById(reviewId);
        
        if (!review) {
            return res.status(404).send({ error: "Review not found" });
        }
        
        // Check if user is the review owner (handle both ObjectId and string comparison)
        const reviewUserId = review.user.toString();
        const currentUserId = userId.toString();
        
        if (reviewUserId !== currentUserId) {
            console.log(`User ID mismatch: review user=${reviewUserId}, current user=${currentUserId}`);
            return res.status(403).send({ error: "You can only delete your own reviews" });
        }
        
        await reviewService.deleteReview(reviewId);

        return res.status(200).send({ message: "Review deleted successfully" });
    } catch (error) {
        console.error('Delete review error:', error);
        return res.status(500).send({
            error: error.message,
        });
    }
};

// Admin-only delete review (for admin panel)
const adminDeleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        
        // Check if user is admin (accept both uppercase and lowercase for compatibility)
        if (req.user.role !== 'ADMIN' && req.user.role !== 'admin') {
            return res.status(403).send({ error: "Only admins can delete reviews from this endpoint" });
        }
        
        // Admin can delete any review without checking ownership
        await reviewService.deleteReview(reviewId);

        return res.status(200).send({ message: "Review deleted successfully by admin" });
    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

// Admin-specific endpoint to get all reviews with full details
const adminGetAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("user", "firstName lastName email role")
            .populate("product", "title imageUrl")
            .sort({ createdAt: -1 });
        
        return res.status(200).send(reviews);
    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

module.exports = {
    createReview,
    getGlobalReviews, 
    getAllReview,
    getReviewSummary,
    getReviewStats,
    markReviewHelpful,
    getUserReview,
    updateReview,
    deleteReview,
    adminDeleteReview,
    adminGetAllReviews,
};