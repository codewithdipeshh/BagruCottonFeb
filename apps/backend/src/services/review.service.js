const Review = require("../models/review.model");
const productService = require("../services/product.service");

async function createReview(reqData, user) {
  try {
    const product = await productService.findProductById(
      reqData.productId
    );

    const review = new Review({
      user: user._id,
      product: product._id,
      review: reqData.review,
      createdAt: new Date(),
    });

    const savedReview = await review.save();

    product.reviews.push(savedReview._id);

    await product.save();

    return savedReview;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllReview(productId) {
  try {
    const product =
      await productService.findProductById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    return await Review.find({
      product: productId,
    }).populate("user");
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createReview,
  getAllReview,
};