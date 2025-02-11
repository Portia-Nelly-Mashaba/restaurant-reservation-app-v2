// DELETE RESTAURANT CONTROLLER
import restaurantModel from "../models/restaurantModel.js";

export const deleteRestaurantController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRestaurant = await restaurantModel.findByIdAndDelete(id);

        if (!deletedRestaurant) {
            return res.status(404).send({
                success: false,
                message: "Restaurant not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Restaurant deleted successfully",
            restaurant: deletedRestaurant,
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
