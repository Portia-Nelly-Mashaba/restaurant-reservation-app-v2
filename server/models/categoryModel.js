import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category Name is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
},
{timestamps:true});

const categoryModel = mongoose.model('Categories', categorySchema);

export default categoryModel;
