// routes/categoryRoutes.js
import express from 'express';
import { createCategoryController, getAllCategoriesController, getCategoryByIdController } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/categories', createCategoryController);  // Create a category
router.get('/categories', getAllCategoriesController);  // Get all categories
router.get('/categories/:id', getCategoryByIdController);  // Get a category by ID

export default router;
