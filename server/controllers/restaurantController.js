import restaurantModel from '../models/restaurantModel.js';

// Create a new restaurant
export const createRestaurant = async (req, res) => {
    try {
        const newRestaurant = new restaurantModel(req.body);
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find().populate('owner').populate('category_id');
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single restaurant by ID
export const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findById(req.params.id).populate('owner').populate('category_id');
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a restaurant by ID
export const updateRestaurant = async (req, res) => {
    try {
        const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('owner').populate('category_id');
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a restaurant by ID
export const deleteRestaurant = async (req, res) => {
    try {
        const deletedRestaurant = await restaurantModel.findByIdAndDelete(req.params.id);
        if (!deletedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get restaurants by category ID
export const getRestaurantsByCategory = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({ category_id: req.params.categoryId }).populate('owner').populate('category_id');
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get restaurants by owner ID
export const getRestaurantsByOwner = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({ owner: req.params.ownerId }).populate('owner').populate('category_id');
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};