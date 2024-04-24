import mongoose from "mongoose";

const cardSelectionSchema = new mongoose.Schema({
  selectedBy: {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  selectedPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PricingPlan",
    required: true,
  },
  selectedAt: {
    type: Date,
    default: Date.now,
  },
});

const CardSelection = mongoose.model("CardSelection", cardSelectionSchema);

export default CardSelection;
