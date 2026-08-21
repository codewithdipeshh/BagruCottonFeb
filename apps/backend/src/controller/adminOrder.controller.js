const orderService = require("../services/order.service");


const getOrderAnalytics = async (req, res) => {
    try {
        const timeframe = req.query.timeframe || 'month'; 
        
        
        const analytics = await orderService.getOrderAnalyticsMetrics(timeframe);
        
        return res.status(200).send({
            success: true,
            timeframe,
            data: analytics
        });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const confirmedOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await orderService.confirmedOrder(orderId);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const shipOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await orderService.shipOrder(orderId);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const deliverOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await orderService.deliverOrder(orderId);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const cancelledOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await orderService.cancelledOrder(orderId);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const deleteOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await orderService.deleteOrder(orderId);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getOrderAnalytics,
    getAllOrders,
    confirmedOrders,
    shipOrders,
    deliverOrders,
    cancelledOrders,
    deleteOrders,
};