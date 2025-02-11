import express from 'express';
import { createMenuItemController, getAllMenuItemsController, getMenuItemByIdController, updateMenuItemController, deleteMenuItemController } from '../controllers/menuController.js';

const router = express.Router();

// Create a new menu item
router.post('/menu-items', createMenuItemController);

// Get all menu items
router.get('/menu-items', getAllMenuItemsController);

// Get a single menu item by ID
router.get('/menu-items/:id', getMenuItemByIdController);

// Update a menu item by ID
router.put('/menu-items/:id', updateMenuItemController);

// Delete a menu item by ID
router.delete('/menu-items/:id', deleteMenuItemController);

export default router;
