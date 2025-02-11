import menuModel from '../models/menuModel.js';

// Create a new menu item
export const createMenuItemController = async (req, res) => {
    try {
        const newMenuItem = new menuModel(req.body);
        await newMenuItem.save();
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all menu items
export const getAllMenuItemsController = async (req, res) => {
    try {
        const menuItems = await menuModel.find().populate('restaurant category');
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single menu item by ID
export const getMenuItemByIdController = async (req, res) => {
    try {
        const menuItem = await menuModel.findById(req.params.id).populate('restaurant category');
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a menu item by ID
export const updateMenuItemController = async (req, res) => {
    try {
        const updatedMenuItem = await menuModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a menu item by ID
export const deleteMenuItemController = async (req, res) => {
    try {
        const deletedMenuItem = await menuModel.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
