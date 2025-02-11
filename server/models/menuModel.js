
import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Menu item title is required'],
            trim: true,
        },
        foodType: {
            type: [String],
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurants',
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },
        imageUrl: {
            type: [String],
            default: [],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories',
            required: true,
        },
        alcoholService: {
            type: Boolean,
            default: false, // FIXED: Removed `required: true`
        },
        dessertService: {
            type: Boolean,
            default: false, // FIXED: Removed `required: true`
        },
        specialMenus: [
            {
                type: String,
                enum: ['Vegan', 'Gluten-Free', 'Halal', 'Vegetarian'],
            },
        ],
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Reviews', // Reference to Review model
            },
        ],
    },
    { timestamps: true }
);

const menuModel = mongoose.model('MenuItems', menuSchema);

export default menuModel;
