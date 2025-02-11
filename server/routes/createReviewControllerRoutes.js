import express from "express";
import { createReviewController } from "../controllers/createReviewController.js";  // <-- Corrected path


const router = express.Router();

// POST route to create a new review
router.post("/reviews", createReviewController);

export default router;
