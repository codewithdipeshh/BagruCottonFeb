const Rating = require("../models/rating.model");
const productService = require("../services/product.service");

async function createRating(req, user) {

    const product = await productService.findProductById(req.productId);

    // Check if user already rated
    const existingRating = await Rating.findOne({
        user: user._id,
        product: product._id,
    });

    if (existingRating) {
        throw new Error(
            "You have already rated this product"
        );
    }

    const rating = new Rating({
        product: product._id,
        user: user._id,
        rating: req.rating,
        createdAt: new Date(),
    });

    return await rating.save();
}
async function getProductRating(productId) {
  try {
    return await Rating.find({
      product: productId,
    }).populate("user");
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createRating,
  getProductRating,
};