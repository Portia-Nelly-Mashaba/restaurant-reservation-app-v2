//GET ALL RESTAUNTS

import restaurantModel from "../models/restaurantModel.js";

export const getAllRestaurantsController = async (req, res) => {
    try{
        const restaurants  = await restaurantModel.find({})
        res.status(200).send({
            success:true,
            message: 'all restaurants fetched successfully',
            restaurants
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Get All Restaurant API',
            error
        })
    }
};

//GET SINGLE RESTAURANT
export const getSingleRestaurantController = async (req, res) => {
    try{
        const restaurant = await restaurantModel.findById(req.params.id)
        //validation
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message: 'restaurant not found'
            })
        }
        res.status(200).send({
            success:true,
            message: 'restaurant found',
            restaurant,
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).send({
            success:false,
            message: 'Error in Get Single Restaurant API',
            error
        })
    }
};
