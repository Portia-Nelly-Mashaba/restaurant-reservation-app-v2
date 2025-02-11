import express from 'express'
import { createRestaurantController, getAllRestaurantsController, getSingleRestaurantController } from '../controllers/restaurantController.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

//routes
//GET ALL RESTAURANT
router.get('/get-all', getAllRestaurantsController)

router.get('/:id', getSingleRestaurantController)

router.post('/create', isAuth, createRestaurantController)


export default router