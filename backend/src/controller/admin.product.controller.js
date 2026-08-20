const Product = require("../models/product.model");

const addProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Kam se kam ek image upload karna zaroori hai bhai!" 
      });
    }

    const imageUrls = req.files.map((file) => file.path);

    const newProduct = new Product({
      name: req.body.name,
      tag: req.body.tag,
      philosophy: req.body.philosophy,
      specifications: req.body.specifications,
      washCare: req.body.washCare,
      price: Number(req.body.price),
      discountedPrice: Number(req.body.discountedPrice),
      discountPercent: Number(req.body.discountPercent),
      category: req.body.category, 
      stock: Number(req.body.stock),
      images: imageUrls, 
    });

    await newProduct.save();
    return res.status(201).json({
      success: true,
      message: "Premium Heritage Saree successfully injected into storage vault! 🎉",
      product: newProduct,
    });
  } catch (error) {
    console.error("DATABASE WRITE ERROR:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category").sort({ createdAt: -1 });
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Asset target code not found." });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: "Product successfully cleared from database registry." 
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteProduct,
};