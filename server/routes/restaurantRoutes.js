import express from 'express'
import { getAllRestaurantsController, getSingleRestaurantController } from '../controllers/restaurantController.js';

const router = express.Router();

//routes
//GET ALL RESTAURANT
router.get('/get-all', getAllRestaurantsController)

router.get('/:id', getSingleRestaurantController)


export default router