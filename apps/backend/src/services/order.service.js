const cartService = require("../services/cart.service");
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderitems");
const Product = require("../models/product.model");

async function createOrder(user, shippingAddress) {
  try {
    let address;

    if (shippingAddress._id) {
      address = await Address.findById(shippingAddress._id);
    } else {
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


async function createDirectBuyOrder(user, reqBody) {
  try {
    const { address: shippingAddress, productId, quantity } = reqBody;
    let address;


    if (shippingAddress._id) {
      address = await Address.findById(shippingAddress._id);
    } else {
      address = new Address({
        ...shippingAddress,
        user: user._id,
      });
      await address.save();
      user.address.push(address._id);
      await user.save();
    }


    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Masterpiece not found");
    }

  
    const orderItem = new OrderItem({
      product: product._id,
      quantity: quantity,
      price: product.price,
      discountedPrice: product.discountedPrice,
      userId: user._id,
      user: user._id,
    });
    const createdOrderItem = await orderItem.save();

  
    const discountAmount = (product.price - product.discountedPrice) * quantity;
    
    const createdOrder = new Order({
      user: user._id,
      orderItems: [createdOrderItem],
      orderDate: new Date(),
      shippingAddress: address._id,
      totalPrice: product.price * quantity,
      totalDiscountedPrice: product.discountedPrice * quantity,
      discounte: discountAmount,
      totalItem: quantity,
      orderStatus: "PENDING",
    });

    const savedOrder = await createdOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.PaymentDetails.PaymentStatus = "COMPLETED";
  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";
  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";
  return await order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";
  order.deliverDate = new Date();
  return await order.save();
}

async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED";
  return await order.save();
}

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

async function userOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
        },
      })
      .populate("shippingAddress")
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserOrders(userId) {
  try {
    const orders = await Order.find({ user: userId })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
        },
      });

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate("user")
    .populate("shippingAddress")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
      },
    })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
  return order;
}

module.exports = {
  createOrder,
  createDirectBuyOrder, 
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelledOrder,
  findOrderById,
  userOrderHistory,
  findUserOrders,
  getAllOrders,
  deleteOrder,
};