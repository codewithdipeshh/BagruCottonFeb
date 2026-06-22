const CartItem = require("../models/cartItem.model");
const userService = require("./user.service");

// Find Cart Item By Id
const findCartItemById = async (cartItemId) => {
  try {
    const cartItem = await CartItem.findById(cartItemId);

    if (!cartItem) {
      throw new Error(
        `Cart Item not found with id: ${cartItemId}`
      );
    }

    return cartItem;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update Cart Item
const updateCartItem = async (
  userId,
  cartItemId,
  cartItemData
) => {
  try {
    const item = await findCartItemById(cartItemId);

    const itemOwnerId = item.user || item.userId;

    if (!itemOwnerId || itemOwnerId.toString() !== userId.toString()) {
      throw new Error(
        "You can't update this cart item"
      );
    }

    item.quantity = cartItemData.quantity;

    const updatedCartItem = await item.save();

    return updatedCartItem;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Remove Cart Item
const removeCartItem = async (
  userId,
  cartItemId
) => {
  try {
    const cartItem = await findCartItemById(cartItemId);

    const itemOwnerId = cartItem.user || cartItem.userId;

    if (!itemOwnerId || itemOwnerId.toString() !== userId.toString()) {
      throw new Error(
        "You can't remove another user's item"
      );
    }

    await CartItem.findByIdAndDelete(
      cartItemId
    );

    return cartItem;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findCartItemById,
  updateCartItem,
  removeCartItem,
};