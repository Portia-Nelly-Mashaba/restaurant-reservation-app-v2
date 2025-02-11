// controllers/categoryController.js
import categoryModel from '../models/categoryModel.js';

// Create a new category
export const createCategoryController = async (req, res) => {
    try {
        const { category, description } = req.body;

        if (!category || !description) {
            return res.status(400).json({ message: 'Category and description are required.' });
        }

        const newCategory = new categoryModel({ category, description });
        await newCategory.save();

        res.status(201).json({ message: 'Category created successfully', data: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get all categories
export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find(); // Fetch all categories from the database
        res.status(200).json({ data: categories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

// Get a category by ID
export const getCategoryByIdController = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ data: category });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
};
