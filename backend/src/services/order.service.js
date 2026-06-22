const cartService = require("../services/cart.service");
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderitems");

// Create Order
async function createOrder(user, shippingAddress) {
  try {
    let address;

    // Existing address
    if (shippingAddress._id) {
      address = await Address.findById(shippingAddress._id);
    } else {
      // New address
      address = new Address({
        ...shippingAddress,
        user: user._id,
      });

      await address.save();

      user.address.push(address._id);
      await user.save();
    }

    const cart = await cartService.findUserCart(user._id);

    const orderItems = [];

    for (const item of cart.cartItems) {
      const orderItem = new OrderItem({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
        discountedPrice: item.discountedPrice,
        userId: user._id,
        user: user._id,
      });

      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
      user: user._id,
      orderItems,
      orderDate: new Date(),
      shippingAddress: address._id,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      discounte: cart.discounte,
      totalItem: cart.totalItem,
      orderStatus: "PENDING",
    });

    const savedOrder = await createdOrder.save();

    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Place Order
async function placeOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.PaymentDetails.PaymentStatus = "COMPLETED";

  return await order.save();
}

// Confirm Order
async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return await order.save();
}

// Ship Order
async function shipOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";

  return await order.save();
}

// Deliver Order
async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELIVERED";
  order.deliverDate = new Date();

  return await order.save();
}

// Cancel Order
async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";

  return await order.save();
}

// Find Order By Id
async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
      },
    })
    .populate("shippingAddress");

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}

// User Order History
async function userOrderHistory(userId) {
  try {
    const orders = await Order.find({
      user: userId,
    })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
        },
      })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get All Orders
async function getAllOrders() {
  return await Order.find()
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
      },
    })
    .lean();
}

// Delete Order
async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);

  await Order.findByIdAndDelete(order._id);

  return order;
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelledOrder,
  findOrderById,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};