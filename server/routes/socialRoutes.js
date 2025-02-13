// routes/socialRoutes.js
import express from "express";
import { createSocialController } from "../controllers/createSocialController.js";  // Corrected path

const router = express.Router();

// POST route to create social media information
router.post("/socials", createSocialController);


export default router;