import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PricingPlan",
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    // required: true,
  },
  paymentStatus: {
    type: String,
    default: "Completed",
  },
  cardHolder: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  cardCCV: {
    type: String,
    maxLength: 3, // Typically 3 digits for most credit cards
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
