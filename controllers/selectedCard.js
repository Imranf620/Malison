
import CardSelection from "../models/selectedCard.js"; // Path to your model
import PricingPlan from "../models/pricingPlanModel.js";

export const selectCard = async (req, res) => {
    const { userId, username, planId } = req.body;
  
    if (!userId || !username || !planId) {
      return res.status(400).json({ error: "Missing required fields." });
    }
  
    try {
      // Ensure the pricing plan exists
      const plan = await PricingPlan.findById(planId);
      if (!plan) {
        return res.status(404).json({ error: "Plan not found." });
      }
  
      // Create a new card selection record
      const newSelection = new CardSelection({
        selectedBy: { userId, username },
        selectedPlan: planId,
      });
  
      await newSelection.save();
      return res.status(201).json({ message: "Card selected successfully." });
    } catch (error) {
      console.error("Error selecting card:", error);
      return res.status(500).json({ error: "Server error." });
    }
  };