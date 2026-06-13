const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },

    paymentId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "success",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Transaction",
  transactionSchema
);