import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const isAuth = async (req, res, next) => {
    const { token } = req.cookies;

    // Validation: check if token exists
    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized user',
        });
    }

    try {
        const decodeData = JWT.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decodeData._id); // Attach user info to request
        next(); // Proceed to next middleware or route handler
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};



