import Payment from "../models/Payment.js";
import PricingPlan from "../models/pricingPlanModel.js";

export const recordPayment = async (req, res) => {
  const {
    userId,
    cardId,
    paymentAmount,
    paymentMethod,
    cardHolder,
    cardNumber,
    cardCCV,
  } = req.body;

  // Validate required fields
  if (!userId || !cardId || !paymentAmount) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Ensure cardId exists in the PricingPlan collection
    const pricingPlan = await PricingPlan.findById(cardId);
    if (!pricingPlan) {
      return res.status(404).json({ error: "Card not found." });
    }

    // Check if payment amount matches the card's price
    if (parseFloat(paymentAmount) !== parseFloat(pricingPlan.price)) {
      return res.status(400).json({ error: "Payment amount does not match card price." });
    }

    // Create new Payment record
    const newPayment = new Payment({
      userId,
      cardId,
      paymentAmount,
      paymentMethod,
      cardHolder,
      cardNumber,
      cardCCV, // Include card CCV
    });

    await newPayment.save();

    return res.status(201).json({ message: "Payment recorded successfully." });
  } catch (error) {
    console.error("Error recording payment:", error);
    return res.status(500).json({ error: "Server error." });
  }
};
