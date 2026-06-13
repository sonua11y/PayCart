const express = require("express");
const router = express.Router();
const razorpay = require("../config/razorpay");
const Transaction = require("../models/Transaction");
const crypto = require("crypto");

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert rupees to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id + "|" + razorpay_payment_id
      )
      .digest("hex");

    const isValid =
      generatedSignature === razorpay_signature;

    if (isValid) {
    await Transaction.create({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: req.body.amount,
        status: "success",
    });

    return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
    });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid payment signature",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;