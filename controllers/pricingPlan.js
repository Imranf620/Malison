import PricingPlan from "../models/pricingPlanModel.js"; // Assuming the PricingPlan model is defined in 'PricingPlan.js'
import { createError } from "../utils/error.js";

// Controller to create a new pricing plan
// Controller to create a new pricing plan
export const createPricingPlan = async (req, res, next) => {
    try {
        // Extract required fields from the request body
        const { username, userId } = req.body;

        // Optionally, fetch user details from the database using userId
        // const user = await User.findById(userId);

        // Create a new PricingPlan document using the request body
        const newPlan = new PricingPlan({
            ...req.body,
            createdBy: { username, userId } // Include username and userId
        });
        
        // Save the new plan to the database
        const savedPlan = await newPlan.save();

        // Send the saved plan as the response
        res.status(201).json(savedPlan);
    } catch (err) {
        console.error(err); // Log the error
        next(err);
    }
};

// Get All Plan

export const getAllPricingDetails = async (req, res, next) => {
    try {
        // Fetch all pricing plans from the database and populate the createdBy field with admin details
        const pricingDetails = await PricingPlan.find({}).populate('createdBy.userId');
        
        // Map the pricing plans to include createdByUsername
        const modifiedPricingDetails = pricingDetails.map(plan => ({
            ...plan.toJSON(),
            createdByUsername: plan.createdBy.username // Assuming the username field exists in createdBy
        }));
        
        // Send the fetched pricing details with createdByUsername as the response
        res.status(200).json(modifiedPricingDetails);
    } catch (err) {
        console.error(err); // Log the error
        next(err);
    }
};



// Controller to delete a pricing plan
export const deletePricingPlan = async (req, res, next) => {
    try {
        // Find the pricing plan by its ID and delete it
        const deletedPlan = await PricingPlan.findByIdAndDelete(req.params.id);
        
        // If the plan doesn't exist, return a 404 error
        if (!deletedPlan) {
            return next(createError(404, "Pricing plan not found"));
        }

        // Send a success message as the response
        res.status(200).json({ message: "Pricing plan deleted successfully" });
    } catch (err) {
        console.error(err); // Log the error
        next(err);
    }
};

export const getPricingPlanById = async (req, res, next) => {
    try {
        // Extract the ID of the pricing plan from the request parameters
        const { id } = req.body;

        // Find the pricing plan by its ID in the database
        const pricingPlan = await PricingPlan.findById(id);

        // If the plan doesn't exist, return a 404 error
        if (!pricingPlan) {
            return next(createError(404, "Pricing plan not found"));
        }

        // Send the fetched pricing plan as the response
        res.status(200).json(pricingPlan);
    } catch (err) {
        console.error(err); // Log the error
        next(err);
    }
};
