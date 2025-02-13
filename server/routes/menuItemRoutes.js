import express from 'express';
import {
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
} from '../controllers/menuItemController.js';

const router = express.Router();

router.post('/create', createMenuItem);
router.get('/get-all', getAllMenuItems);
router.get('/:id', getMenuItemById);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);


export default router;