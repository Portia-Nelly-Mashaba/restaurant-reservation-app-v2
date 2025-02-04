import express from 'express'
import { getUserProfileController, loginController, logoutController, registerController, updateprofileController, updateProfilePicController, updateUserprofileController } from '../controllers/userController.js'
import { isAuth } from '../middlewares/authMiddleware.js';



//router object
const router  = express.Router()



//routes
router.post('/register', registerController)
router.post('/login', loginController)
router.get('/profile', isAuth, getUserProfileController)
router.get('/logout', isAuth, logoutController)
router.put('/update-profile', isAuth, updateprofileController)
router.put('/update-password', isAuth, updateUserprofileController)
router.put('/update-picture', isAuth, updateProfilePicController);
//export
export default router