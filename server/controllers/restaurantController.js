import restaurantModel from "../models/restaurantModel.js";

// CREATE Restaurant
export const createRestaurantController = async (req, res) => {
    try {
        const newRestaurant = new restaurantModel(req.body);
        await newRestaurant.save();
        res.status(201).send({
            success: true,
            message: "Restaurant created successfully",
            restaurant: newRestaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Create Restaurant API",
            error,
        });
    }
};

// GET All Restaurants
export const getAllRestaurantsController = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({});
        res.status(200).send({
            success: true,
            message: "All restaurants fetched successfully",
            restaurants,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Restaurants API",
            error,
        });
    }
};

// GET Single Restaurant
export const getSingleRestaurantController = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "Restaurant not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Restaurant fetched successfully",
            restaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Single Restaurant API",
            error,
        });
    }
};

// UPDATE Restaurant
export const updateRestaurantController = async (req, res) => {
    try {
        const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Restaurant updated successfully",
            restaurant: updatedRestaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update Restaurant API",
            error,
        });
    }
};

// DELETE Restaurant
export const deleteRestaurantController = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "Restaurant not found",
            });
        }
        await restaurantModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: "Restaurant deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Restaurant API",
            error,
        });
    }
};
