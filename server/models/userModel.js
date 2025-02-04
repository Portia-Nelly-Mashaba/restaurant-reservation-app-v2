import mongoose from "mongoose";
import  bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    surname: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email already taken']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [6, 'password length should be greater than 6 characters']
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    city: {
        type: String,
        required: [true, 'city is required']
    },
    country: {
        type: String,
        required: [true, 'country is required']
    },
    phone: {
        type: String,
        required: [true, 'phone no is required']
    },
    profile_img: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    usertype: {
        type: String,
        enum: ["Client", "Admin", "SuperAdmin"], 
        default: "Client" 
    }
}, { timestamps: true });

//function
//hash func

// userSchema.pre('save', async function(next){
//     if(!this.ismodified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10)
// })
userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

//compare function
userSchema.methods.comparePassword = async function(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password)
}

//JWT TOKEN
userSchema.methods.generateToken = function() {
    return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

const User = mongoose.model('Users', userSchema);

export default User;
