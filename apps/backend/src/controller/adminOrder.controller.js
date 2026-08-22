const orderService = require("../services/order.service");

// GET ALL ORDERS FOR ADMIN
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        return res.status(500).send({ error: error.message || "Failed to fetch orders" });
    }
};

// CONFIRM AN ORDER
const confirmedOrder = async (req, res) => {
    try {
        const { id: orderId } = req.params;
        if (!orderId) {
            return res.status(400).send({ error: "Order ID parameter is required" });
        }

        const order = await orderService.confirmedOrder(orderId);
        return res.status(200).send(order);
    } catch (error) {
        console.error(`Error confirming order ${req.params.id}:`, error);
        return res.status(500).send({ error: error.message || "Failed to confirm order" });
    }
};

// MARK ORDER AS SHIPPED
const shippedOrder = async (req, res) => {
    try {
        const { id: orderId } = req.params;
        if (!orderId) {
            return res.status(400).send({ error: "Order ID parameter is required" });
        }

        const order = await orderService.shipOrder(orderId);
        return res.status(200).send(order);
    } catch (error) {
        console.error(`Error shipping order ${req.params.id}:`, error);
        return res.status(500).send({ error: error.message || "Failed to mark order as shipped" });
    }
};

// MARK ORDER AS DELIVERED
const deliveredOrder = async (req, res) => {
    try {
        const { id: orderId } = req.params;
        if (!orderId) {
            return res.status(400).send({ error: "Order ID parameter is required" });
        }

        const order = await orderService.deliverOrder(orderId);
        return res.status(200).send(order);
    } catch (error) {
        console.error(`Error delivering order ${req.params.id}:`, error);
        return res.status(500).send({ error: error.message || "Failed to mark order as delivered" });
    }
};

// CANCEL AN ORDER
const cancelOrder = async (req, res) => {
    try {
        const { id: orderId } = req.params;
        if (!orderId) {
            return res.status(400).send({ error: "Order ID parameter is required" });
        }

        const order = await orderService.cancelledOrder(orderId);
        return res.status(200).send(order);
    } catch (error) {
        console.error(`Error cancelling order ${req.params.id}:`, error);
        return res.status(500).send({ error: error.message || "Failed to cancel order" });
    }
};

// DELETE AN ORDER
const deleteOrder = async (req, res) => {
    try {
        const { id: orderId } = req.params;
        if (!orderId) {
            return res.status(400).send({ error: "Order ID parameter is required" });
        }

        await orderService.deleteOrder(orderId);
        return res.status(200).send({
            message: "Order deleted successfully",
            orderId: orderId,
        });
    } catch (error) {
        console.error(`Error deleting order ${req.params.id}:`, error);
        return res.status(500).send({ error: error.message || "Failed to delete order" });
    }
};

module.exports = {
    getAllOrders,
    confirmedOrder,
    shippedOrder,
    deliveredOrder,
    cancelOrder,
    deleteOrder,
};