import express from 'express';
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from '../controllers/restaurantController.js';

const router = express.Router();

// Routes for Restaurant
router.post('/', createRestaurant);  // Create restaurant
router.get('/', getAllRestaurants);  // Get all restaurants
router.get('/:id', getRestaurantById);  // Get restaurant by ID
router.put('/:id', updateRestaurant);  // Update restaurant
router.delete('/:id', deleteRestaurant);  // Delete restaurant

export default router;
