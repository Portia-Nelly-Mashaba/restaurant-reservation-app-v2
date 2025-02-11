import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurants', // Reference to restaurant
            required: false, // Optional if it's a food review
        },
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuItems', // Reference to food item
            required: false, // Optional if it's a restaurant review
        },
        comments: {
            type: String,
            required: true,
            trim: true,
        },
        ratings: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        ratingCount: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

const reviewModel = mongoose.model('Reviews', reviewSchema);

export default reviewModel;