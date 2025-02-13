import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurants", // Reference to Restaurant model
            required: true,
        },
        facebook: {
            type: String,
            trim: true,
        },
        instagram: {
            type: String,
            trim: true,
        },
        twitter: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

const socialModel = mongoose.model("Social", socialSchema);

export default socialModel;
