export const getSingleRestaurantController = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findById(req.params.id); // Fetch restaurant by ID

        // Validation: If restaurant is not found, return 404
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: 'Restaurant not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Restaurant found',
            restaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get Single Restaurant API',
            error,
        });
    }
};
