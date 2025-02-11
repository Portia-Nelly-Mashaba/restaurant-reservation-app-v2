import {
    getAllRestaurantsController,
    getSingleRestaurantController,
    createRestaurantController,
    updateRestaurantController,
    deleteRestaurantController,
} from "../controllers/restaurantController.js";

const router = express.Router();

// Define Routes
router.get('/restaurants', getAllRestaurantsController);
router.get('/restaurants/:id', getSingleRestaurantController);
router.post('/restaurants', createRestaurantController);
router.put('/restaurants/:id', updateRestaurantController);
router.delete('/restaurants/:id', deleteRestaurantController); // DELETE route

export default router;
