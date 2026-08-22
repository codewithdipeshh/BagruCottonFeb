const Razorpay = require('razorpay');

// Razorpay ka instance banayein .env keys ke sath
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPaymentLink = async (req, res) => {
  try {
   
    const { amount } = req.body; 

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const options = {

      amount: amount * 100, 
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    // Razorpay par order create karein
    const order = await razorpayInstance.orders.create(options);

    // Order details frontend ko wapas bhej dein
    res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });

  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ error: "Payment order creation failed!" });
  }
};

module.exports = {
  createPaymentLink
};