import express from 'express';
import { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} from '../controllers/categoryController.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET ALL CATEGORIES
router.get('/get-all', getCategories);

// GET SINGLE CATEGORY BY ID
router.get('/:id', getCategoryById);

// CREATE CATEGORY
router.post('/create', isAuth, createCategory);

// UPDATE CATEGORY
router.put('/update/:id', isAuth, updateCategory);

// DELETE CATEGORY
router.delete('/delete/:id', isAuth, deleteCategory);

export default router;
