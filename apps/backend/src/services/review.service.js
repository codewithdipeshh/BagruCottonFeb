const Review = require("../models/review.model");
const productService = require("../services/product.service");
const orderService = require("../services/order.service");

async function createReview(reqData, user) {
  try {
    const product = await productService.findProductById(reqData.productId);

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: user._id,
      product: product._id,
    });

    if (existingReview) {
      throw new Error("You have already reviewed this product");
    }

    // Check if user has purchased this product
    let verifiedPurchase = false;
    try {
      const userOrders = await orderService.findUserOrders(user._id);
      verifiedPurchase = userOrders.some(order => 
        order.orderItems.some(item => item.product.toString() === product._id.toString())
      );
    } catch (error) {
      console.log("Could not verify purchase:", error.message);
    }

    const review = new Review({
      user: user._id,
      product: product._id,
      review: reqData.review,
      rating: reqData.rating,
      images: reqData.images || [],
      verifiedPurchase: verifiedPurchase,
      createdAt: new Date(),
    });

    const savedReview = await review.save();

    // Assuming your product model has a reviews array
    if(product.reviews) {
       product.reviews.push(savedReview._id);
       await product.save();
    }

    // Populate user data before returning
    await savedReview.populate("user", "firstName email");

    return savedReview;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllReviewsGlobal() {
  try {
    const reviews = await Review.find()
      .populate("user", "firstName lastName email")
      .populate("product", "title imageUrl") 
      .sort({ createdAt: -1 })
      .limit(30); 
    
    return reviews;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllReview(productId, options = {}) {
  try {
    const { 
      rating, 
      sort = 'recent', 
      page = 1, 
      limit = 10 
    } = options;

    const product = await productService.findProductById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    let query = { product: productId };

    if (rating) {
      query.rating = parseInt(rating);
    }

    let sortOption = {};
    switch (sort) {
      case 'recent':
        sortOption = { createdAt: -1 };
        break;
      case 'helpful':
        sortOption = { helpfulVotes: -1, createdAt: -1 };
        break;
      case 'highest':
        sortOption = { rating: -1, createdAt: -1 };
        break;
      case 'lowest':
        sortOption = { rating: 1, createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const reviews = await Review.find(query)
      .populate("user", "firstName lastName email")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments(query);

    return {
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getReviewSummary(productId) {
  try {
    const reviews = await Review.find({ product: productId });

    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);

    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach(review => {
      ratingDistribution[review.rating]++;
    });

    return {
      averageRating: parseFloat(averageRating),
      totalReviews: reviews.length,
      ratingDistribution
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getReviewStats(productId) {
  try {
    const reviews = await Review.find({ product: productId });

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

    const ratingDistribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach(review => {
      if (ratingDistribution[review.rating] !== undefined) {
        ratingDistribution[review.rating]++;
      }
    });

    const ratingPercentages = {};
    Object.keys(ratingDistribution).forEach(rating => {
      ratingPercentages[rating] = totalReviews > 0
        ? (ratingDistribution[rating] / totalReviews) * 100
        : 0;
    });

    return {
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution,
      ratingPercentages,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function markReviewHelpful(reviewId, userId) {
  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      throw new Error("Review not found");
    }

    // Check if user already voted
    if (review.votedUsers.includes(userId)) {
      throw new Error("You have already voted on this review");
    }

    review.helpfulVotes += 1;
    review.votedUsers.push(userId);

    await review.save();

    // Populate user data before returning
    await review.populate("user", "firstName lastName email");

    return review;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserReview(productId, userId) {
  try {
    const review = await Review.findOne({
      product: productId,
      user: userId
    }).populate("user", "firstName lastName email");

    // Return null instead of throwing error if no review found
    return review || null;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateReview(reviewId, reqData, user) {
  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      throw new Error("Review not found");
    }

    if (review.user.toString() !== user._id.toString()) {
      throw new Error("You can only edit your own review");
    }

    review.review = reqData.review || review.review;
    review.rating = reqData.rating || review.rating;
    
    // Handle images - merge existing with new if provided
    if (reqData.images && reqData.images.length > 0) {
      review.images = reqData.images;
    }

    await review.save();

    // Populate user data before returning
    await review.populate("user", "firstName lastName email");

    return review;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteReview(reviewId) {
  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      throw new Error("Review not found");
    }

    // Remove review from product's reviews array
    const product = await productService.findProductById(review.product);
    if (product && product.reviews) {
      product.reviews = product.reviews.filter(id => id.toString() !== reviewId);
      await product.save();
    }

    await Review.findByIdAndDelete(reviewId);

    return { message: "Review deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createReview,
  getAllReviewsGlobal, 
  getAllReview,
  getReviewSummary,
  getReviewStats,
  markReviewHelpful,
  getUserReview,
  updateReview,
  deleteReview,
};