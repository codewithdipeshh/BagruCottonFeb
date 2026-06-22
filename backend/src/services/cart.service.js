const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

// Create Cart
const createCart = async (user) => {
  try {
    const cart = new Cart({
      user: user._id,
    });

    return await cart.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Find User Cart
const findUserCart = async (userId) => {
  try {
    let cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      cart = new Cart({ user: userId });
      await cart.save();
    }

    const cartItems = await CartItem.find({
      cart: cart._id,
    }).populate("product");

    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (const cartItem of cartItems) {
      totalPrice += cartItem.price * cartItem.quantity;
      totalDiscountedPrice += cartItem.discountedPrice * cartItem.quantity;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.totalItem = totalItem;
    cart.discounte = totalPrice - totalDiscountedPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Add Item To Cart
const addCartItem = async (userId, req) => {
  try {
    let cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      cart = new Cart({ user: userId });
      await cart.save();
    }

    const product = await Product.findById(req.productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!isPresent) {
      const cartItem = new CartItem({
        cart: cart._id,
        product: product._id,
        quantity: req.quantity || 1,
        price: product.price,
        discountedPrice: product.discountedPrice,
        userId,
        user: userId,
      });

      const createdCartItem = await cartItem.save();

      cart.cartItems.push(createdCartItem._id);
      await cart.save();

      return createdCartItem;
    }

    isPresent.quantity += req.quantity || 1;
    return await isPresent.save();

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCart,
  findUserCart,
  addCartItem,
};