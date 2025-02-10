import express from 'express';
import { testController } from '../controllers/testController.js';

//router object
const router = express.Router();

// Define the route with /test
router.get('/test', testController);

export default router;
