export const updateRestaurantController = async (req, res) => {
    try {
        const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
            req.params.id, // Find by restaurant ID
            req.body, // Update with request body
            { new: true } // Return updated document
        );

        if (!updatedRestaurant) {
            return res.status(404).send({
                success: false,
                message: 'Restaurant not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Restaurant updated successfully',
            restaurant: updatedRestaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update Restaurant API',
            error,
        });
    }
};
