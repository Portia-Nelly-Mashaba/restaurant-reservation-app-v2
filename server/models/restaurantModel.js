import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,  // Link to the User model (logged-in user)
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
  socialMedia: {
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
  operationDetails: {
    hoursOfOperation: {
      type: String,
      trim: true,
      required: [true, 'Hours of Operation is required'],
    },
    holidayHours: {
      type: String,
      trim: true,
      required: [true, 'Holiday Hours is required'],
    },
    cuisineType: {
      type: String,
      trim: true,
      required: [true, 'Cuisine Type is required'],
    },
    averagePrice: {
      type: Number,
      min: [0, 'Average price cannot be less than 0'],
      required: [true, 'Average Price is required'],
    },
  },
  reservationPolicy: {
    reservationAllowed: {
      type: Boolean,
      default: false,
      required: [true, 'Reservation Allowance is required'],
    },
    advanceReservationPeriod: {
      type: Number,
      min: [0, 'Advance reservation period cannot be less than 0'],
      required: [true, 'Advance Reservation Period is required'],
    },
    advanceReservationPeriodHours: {
      type: Number,
      min: [0, 'Advance reservation period hours cannot be less than 0'],
      required: [true, 'Advance Reservation Period in Hours is required'],
    },
    maxPartySize: {
      type: Number,
      min: [1, 'Maximum party size must be at least 1'],
      required: [true, 'Maximum Party Size is required'],
    },
  },
  menuAndServices: {
    menuItems: [{
      title: {
        type: String,
        trim: true,
        required: [true, 'Menu item title is required'],
      },
      description: {
        type: String,
        trim: true,
        required: [true, 'Menu item description is required'],
      },
      image: {
        type: String,
        trim: true,
      },
    }],
    alcoholService: {
      type: Boolean,
      default: false,
      required: [true, 'Alcohol Service is required'],
    },
    dessertService: {
      type: Boolean,
      default: false,
      required: [true, 'Dessert Service is required'],
    },
    specialMenus: [{
      type: String,
      enum: ['Vegan', 'Gluten-Free', 'Halal'],
    }],
  },
  restaurantFeatures: {
    placeToPray: {
      type: Boolean,
      default: false,
    },
    petFriendly: {
      type: Boolean,
      default: false,
    },
    kidFriendly: {
      type: Boolean,
      default: false,
    },
    familyStyle: {
      type: Boolean,
      default: false,
    },
    romanticStyle: {
      type: Boolean,
      default: false,
    },
    liveMusic: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    karaoke: {
      type: Boolean,
      default: false,
    },
    outdoorSeating: {
      type: Boolean,
      default: false,
    },
    wifi: {
      type: Boolean,
      default: false,
    },
    boardGames: {
      type: Boolean,
      default: false,
    },
  },
  mediaGallery: {
    photos: [{
      type: String,
      trim: true,
    }],
    additionalInformation: {
      type: String,
      trim: true,
    },
  }
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
