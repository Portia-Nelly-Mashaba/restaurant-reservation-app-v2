const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    uid: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: Array, required: false},
    phone: {type: String, required: false},
    userType: {type: String, required: true, default: 'Client', enum: ['Super Admin', 'Admin', 'Client']},
    profile: {
        type: String,
        required: true,
        default: 'https://cdni.iconscout.com/illustration/premium/thumb/female-user-image-illustration-download-in-svg-png-gif-file-formats--person-girl-business-pack-illustrations-6515859.png?f=webp'

    },
},  {timestamps: true})

module.exports = mongoose.model('User', UserSchema)