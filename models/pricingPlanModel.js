import mongoose from "mongoose";

const pricingPlanSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: [true, "Package name is required"],
  },
  price: {
    type: String,
    required: [true, "Price is required"],
  },
  subscription: {
    type: String,
    required: [true, "Subscription type is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  features: [{
    type: String,
    required: true,
  }],
  createdBy: {
    username: String,
    userId: String
  }
});

const PricingPlan = mongoose.model("PricingPlan", pricingPlanSchema);

export default PricingPlan;
