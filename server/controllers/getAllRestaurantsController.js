import restaurantModel from "../models/restaurantModel.js";

export const getAllRestaurantsController = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({}); // Fetch all restaurants from the database
        res.status(200).send({
            success: true,
            message: 'All restaurants fetched successfully',
            restaurants,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All Restaurant API',
            error,
        });
    }
};
