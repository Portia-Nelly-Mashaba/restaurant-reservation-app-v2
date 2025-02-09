// userRouter.js
import express from 'express';
import { 
  getUserProfileController, 
  loginController, 
  logoutController, 
  registerController, 
  updateProfileController,  // Correct function name
  updateProfilePicController, 
  updatePasswordController  // Correct function name
} from '../controllers/userController.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', isAuth, getUserProfileController);
router.get('/logout', isAuth, logoutController);
router.put('/update-profile', isAuth, updateProfileController);
router.put('/update-password', isAuth, updatePasswordController); // Fixed
router.put('/update-picture', isAuth, updateProfilePicController);

export default router;