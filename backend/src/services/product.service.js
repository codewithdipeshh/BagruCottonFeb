const Product = require("../models/product.model");
const Category = require("../models/category.model");

// Create Product
async function createProduct(productData) {
  try {
    const category = await Category.findById(productData.category);

    if (!category) {
      throw new Error("Category not found");
    }

    const product = new Product({
      title: productData.title,
      description: productData.description,
      price: productData.price,
      discountedPrice: productData.discountedPrice,
      discountPercent: productData.discountPercent, // ✅ Fixed spelling (c instead of s)
      quantity: productData.quantity,
      imageUrl: productData.imageUrl, // ✅ Fixed spelling (imageUrl)
      category: category._id,
    });

    const createdProduct = await product.save();
    return createdProduct;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Find Product By Id
async function findProductById(productId) {
  try {
    const product = await Product.findById(productId)
      .populate("category")
      .populate("reviews")
      .populate("ratings"); // ✅ Fixed: "ratings" (with 's' to match schema)

    if (!product) {
      throw new Error(`Product not found with id: ${productId}`);
    }

    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

// ✅ Changed function name from getAllProducts to findAllProducts to match controller
async function findAllProducts() {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("reviews")
      .populate("ratings"); // ✅ Fixed: "ratings"

    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Update Product
async function updateProduct(productId, reqData) {
  try {
    const product = await findProductById(productId);

    product.title = reqData.title || product.title;
    product.description = reqData.description || product.description;
    product.price = reqData.price || product.price;
    product.discountedPrice = reqData.discountedPrice || product.discountedPrice;
    product.discountPercent = reqData.discountPercent || product.discountPercent; // ✅ Fixed spelling
    product.quantity = reqData.quantity || product.quantity;
    product.imageUrl = reqData.imageUrl || product.imageUrl; // ✅ Fixed spelling

    if (reqData.category) {
      const category = await Category.findById(reqData.category);
      if (!category) {
        throw new Error("Category not found");
      }
      product.category = category._id;
    }

    return await product.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

// Delete Product
async function deleteProduct(productId) {
  try {
    const product = await findProductById(productId);
    await Product.findByIdAndDelete(productId);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get Products By Category
async function findProductsByCategory(categoryId) {
  try {
    const products = await Product.find({ category: categoryId }).populate("category");
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createProduct,
  findProductById,
  findAllProducts, // ✅ Sahi naam export kar diya
  updateProduct,
  deleteProduct,
  findProductsByCategory,
};