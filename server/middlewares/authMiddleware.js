import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  // Try to get token from cookies; if not present, get it from the Authorization header.
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized user",
    });
  }
  
  try {
    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodeData._id);
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};



