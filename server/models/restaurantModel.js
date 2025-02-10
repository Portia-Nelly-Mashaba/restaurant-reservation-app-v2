import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Restaurant name is required'],
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories',
            required: true,
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Deactivated'],
            default: 'Pending',
        },
        hoursOfOperation: {
            type: String,
            trim: true,
            required: [true, 'Hours of Operation is required'],
        },
        holidayHours: {
            type: String,
            trim: true,
        },
        averagePrice: {
            type: Number,
            min: [0, 'Average price cannot be less than 0'],
            required: [true, 'Average Price is required'],
        },
        reservationPolicy: {
            reservationAllowed: {
                type: Boolean,
                default: false, // FIXED: Removed `required: true`
            },
            advanceReservationPeriod: {
                type: Number,
                min: [0, 'Advance reservation period cannot be less than 0'],
                required: true,
            },
            advanceReservationPeriodHours: {
                type: Number,
                min: [0, 'Advance reservation period hours cannot be less than 0'],
                required: true,
            },
            maxPartySize: {
                type: Number,
                min: [1, 'Maximum party size must be at least 1'],
                required: true,
            },
        },
        imageUrl: {
            type: String,
            trim: true,
            required: true,
        },
        features: {
            type: [String],
            default: [],
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Reviews', // Reference to Review model
            },
        ],
        isFavorite: {
            type: Boolean,
            default: false,
        },
        additionalInformation: {
            type: String,
            trim: true,
        },
        restaurantFeatures: {
            type: Object,
            default: {
                placeToPray: false,
                petFriendly: false,
                kidFriendly: false,
                familyStyle: false,
                romanticStyle: false,
                liveMusic: false,
                parking: false,
                karaoke: false,
                outdoorSeating: false,
                wifi: false,
                boardGames: false,
            },
        },
    },
    { timestamps: true }
);

const restaurantModel = mongoose.model('Restaurants', restaurantSchema);

export default restaurantModel;
