const Wishlist = require('../models/wishlist.model.js');

const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    let wishlist = await Wishlist.findOne({ user: userId }).populate('products');
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, products: [] });
    }
    
    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const toggleWishlistItem = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, products: [] });
    }

    const itemIndex = wishlist.products.indexOf(productId);

    if (itemIndex > -1) {
      wishlist.products.splice(itemIndex, 1);
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    const updatedWishlist = await Wishlist.findOne({ user: userId }).populate('products');

    return res.status(200).json(updatedWishlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeWishlistItem = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    const itemIndex = wishlist.products.indexOf(productId);

    if (itemIndex > -1) {
      wishlist.products.splice(itemIndex, 1);
      await wishlist.save();
    }

    const updatedWishlist = await Wishlist.findOne({ user: userId }).populate('products');

    return res.status(200).json(updatedWishlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWishlist,
  toggleWishlistItem,
  removeWishlistItem
};