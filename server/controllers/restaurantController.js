//GET ALL RESTAUNTS

import restaurantModel from "../models/restaurantModel.js";
import categoryModel from "../models/categoryModel.js";

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
        // cast erropr || OBJECT ID
        if(error.name === 'CastError'){
            return res.status(500).send({
                success:false,
                message: 'Invalid Id',
            });
        }
        res.status(500).send({
            success:false,
            message: 'Error in Get Single Restaurant API',
            error
        })
    }
};

export const createRestaurantController = async (req, res) => {
    try {
        // Extract user ID from authentication middleware
        const owner = req.user.id;

        let {
            title,
            categoryName, 
            address,
            city,
            country,
            phone,
            status,
            hoursOfOperation,
            holidayHours,
            averagePrice,
            advanceReservationPeriod,
            advanceReservationPeriodHours,
            maxPartySize,
            imageUrl,
            features,
            reviews,
            isFavorite,
            additionalInformation,
            restaurantFeatures,
        } = req.body;

        // Validate required fields
        if (!title || !categoryName || !address || !city || !country || !phone || !hoursOfOperation || !averagePrice || !imageUrl) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }

        // Fetch category ID based on category name
        const category = await categoryModel.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category name',
            });
        }

        // Create a new restaurant with resolved references
        const newRestaurant = new restaurantModel({
            title,
            owner, // Auto-assigned from authenticated user
            category_id: category._id, // Auto-assigned from category name
            address,
            city,
            country,
            phone,
            status,
            hoursOfOperation,
            holidayHours,
            averagePrice,
            reservationPolicy: {
                advanceReservationPeriod,
                advanceReservationPeriodHours,
                maxPartySize,
            },
            imageUrl,
            features,
            reviews,
            isFavorite,
            additionalInformation,
            restaurantFeatures,
        });

        // Save to database
        await newRestaurant.save();

        res.status(201).json({
            success: true,
            message: 'Restaurant created successfully',
            restaurant: newRestaurant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating restaurant',
            error: error.message,
        });
    }
};