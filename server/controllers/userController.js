import userModel from "../models/userModel.js"; 
import bcrypt from 'bcryptjs';
import { getDataUri } from "../utils/Features.js";
import cloudinary from 'cloudinary'

export const registerController = async (req, res) => {
  try {
    const { name, surname, email, password, address, city, country, phone } =
      req.body;
    // Validation
    if (
      !name ||
      !surname ||
      !email ||
      !password ||
      !address ||
      !city ||
      !country ||
      !phone
    ) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    // Check existing user
    const existingUser = await userModel.findOne({ email });
    // Validation
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "email already taken",
      });
    }
    const user = await userModel.create({
      name,
      surname,
      email,
      password,
      address,
      city,
      country,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "Registration success, please login",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

// LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT
    const token = user.generateToken();

    // Set cookie properly
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // Debugging: Ensure token is in response
      user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error in login API", error });
  }
};

//GET USER PROFILE
export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User Profile Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Profile API",
      error,
    });
  }
};

//LOGOUT USER
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
    res
      .status(500)
      .json({ success: false, message: "Error in Logout API", error });
  }
};


// UPDATE PROFILE
export const updateprofileController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        const { name, surname, email, address, city, country, phone, usertype } = req.body;

        // Validation
        if (name) user.name = name;
        if (surname) user.surname = surname;
        if (email) user.email = email;
        if (address) user.address = address;
        if (city) user.city = city;
        if (country) user.country = country;
        if (phone) user.phone = phone;
        if (usertype) user.usertype = usertype;

        // Save
        await user.save();

        res.status(200).send({
            success: true,
            message: 'User Profile Updated Successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Error in Update Profile API", 
            error: error.message 
        });
    }
};

// UPDATE USER PROFILE
export const updateUserprofileController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        const { oldPassword, newPassword } = req.body;

        // Validation
        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: 'Please provide old and new passwords',
            });
        }

        // Old password check
        const isMatch = await user.comparePassword(oldPassword);

        // Validation
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Invalid old password',
            });
        }

        // Hash the new password before saving
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Password Updated Successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in Update Password API',
            error: error.message,
        });
    }
};

// USER PROFILE PICTURE
export const updateProfilePicController = async (req, res) => {
    try {
        console.log("Received Files:", req.files); // Debugging

        if (!req.files || !req.files.profile_img) {
            return res.status(400).send({
                success: false,
                message: "No file uploaded",
            });
        }

        const file = req.files.profile_img;
        const fileUri = getDataUri(file);

        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        // Delete old image if exists
        if (user.profile_img?.public_id) {
            await cloudinary.v2.uploader.destroy(user.profile_img.public_id);
        }

        // Upload to Cloudinary
        const cdb = await cloudinary.v2.uploader.upload(fileUri.content);

        user.profile_img = { public_id: cdb.public_id, url: cdb.secure_url };

        await user.save();

        res.status(200).send({ success: true, message: "Profile picture updated" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Error in Update Profile Picture API", error: error.message });
    }
};
