import menuModel from '../models/menuModel.js';

// Create a new menu item
export const createMenuItem = async (req, res) => {
    try {
        console.log("Request body:", req.body);  // Debug log
        const newMenuItem = new menuModel(req.body);
        const savedMenuItem = await newMenuItem.save();
        res.status(201).json(savedMenuItem);
    } catch (error) {
        console.error("Error creating menu item:", error);
        res.status(400).json({ message: error.message });
    }
};


// Get all menu items
export const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await menuModel.find().populate('restaurant').populate('category');
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single menu item by ID
export const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await menuModel.findById(req.params.id).populate('restaurant').populate('category');
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a menu item by ID
export const updateMenuItem = async (req, res) => {
    try {
        const updatedMenuItem = await menuModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('restaurant').populate('category');
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a menu item by ID
export const deleteMenuItem = async (req, res) => {
    try {
        const deletedMenuItem = await menuModel.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get menu items by restaurant ID
export const getMenuItemsByRestaurant = async (req, res) => {
    try {
        const menuItems = await menuModel.find({ restaurant: req.params.restaurantId }).populate('restaurant').populate('category');
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get menu items by category ID
export const getMenuItemsByCategory = async (req, res) => {
    try {
        const menuItems = await menuModel.find({ category: req.params.categoryId }).populate('restaurant').populate('category');
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get menu items by food type
export const getMenuItemsByFoodType = async (req, res) => {
    try {
        const { foodType } = req.params;
        const menuItems = await menuModel.find({ foodType: { $in: [foodType] } }).populate('restaurant').populate('category');
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get menu items by special menu (e.g., Vegan, Gluten-Free, etc.)
export const getMenuItemsBySpecialMenu = async (req, res) => {
    try {
        const { specialMenu } = req.params;
        const menuItems = await menuModel.find({ specialMenus: { $in: [specialMenu] } }).populate('restaurant').populate('category');
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};