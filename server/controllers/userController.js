import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { getDataUri } from "../utils/Features.js";
import cloudinary from "cloudinary";

// USER REGISTRATION
export const registerController = async (req, res) => {
  try {
    const { name, surname, email, password, address, city, country, phone } = req.body;

    if (!name || !surname || !email || !password || !address || !city || !country || !phone) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already taken" });
    }

    const user = await userModel.create({ name, surname, email, password, address, city, country, phone });

    res.status(201).json({ success: true, message: "Registration successful, please login", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in register API", error });
  }
};

// USER LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = user.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in login API", error });
  }
};

// GET USER PROFILE
export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    res.status(200).json({ success: true, message: "User Profile Fetched Successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in Profile API", error });
  }
};

// LOGOUT USER
export const logoutController = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // Expire the cookie
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in Logout API", error });
  }
};

// UPDATE USER DETAILS
export const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { name, surname, email, address, city, country, phone, usertype } = req.body;
    
    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;
    if (usertype) user.usertype = usertype;

    await user.save();

    res.status(200).json({ success: true, message: "User Profile Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in Update Profile API", error: error.message });
  }
};

// UPDATE USER PASSWORD
export const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Please provide old and new passwords" });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid old password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ success: true, message: "Password Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in Update Password API", error: error.message });
  }
};

// UPDATE PROFILE PICTURE
export const updateProfilePicController = async (req, res) => {
  try {
    if (!req.files || !req.files.profile_img) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const file = req.files.profile_img;
    const fileUri = getDataUri(file);

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.profile_img?.public_id) {
      await cloudinary.v2.uploader.destroy(user.profile_img.public_id);
    }

    const cdb = await cloudinary.v2.uploader.upload(fileUri.content);
    user.profile_img = { public_id: cdb.public_id, url: cdb.secure_url };

    await user.save();

    res.status(200).json({ success: true, message: "Profile picture updated" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Error in Update Profile Picture API", error: error.message });
  }
};
