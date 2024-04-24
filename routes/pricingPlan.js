import express from 'express';
import {
  createPricingPlan,
  deletePricingPlan,
  getAllPricingDetails,
  getPricingPlanById,
} from '../controllers/pricingPlan.js';
import { selectCard } from '../controllers/selectedCard.js'; // Controller for card selection
import { recordPayment } from '../controllers/paymentController.js'; // Controller for recording payments

const router = express.Router();

// Existing routes for pricing plans
router.post("/createCard", createPricingPlan);
router.delete("/deleteCard/:id", deletePricingPlan);
router.get("/getCard", getAllPricingDetails);
router.post("/getSingleCard", getPricingPlanById);

// Route for card selection
router.post("/selectCard", selectCard);

// New route for recording payments
router.post("/recordPayment", recordPayment);

export default router;
