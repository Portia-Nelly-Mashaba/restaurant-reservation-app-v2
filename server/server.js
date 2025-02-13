import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import testRoutes from './routes/testRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import connectDB from './config/db.js'
import userRoutes from './routes/userRouter.js'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload';

//dot env config
dotenv.config();

//connect database
connectDB();

//cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

const app = express()

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use(fileUpload());

// app.use(cors({
//     origin: "http://localhost:8080", // Change this to match your frontend URL
//     credentials: true // Allows cookies to be sent
// }));

//route
app.use('/api', testRoutes);
app.use('/api/user', userRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/category', categoryRoutes);

app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome To Restaurant Reserve App by Portia</h1>");
});
//port
const PORT = process.env.PORT || 3008;

//listen
app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT} on ${process.env.NODE_ENV}`.bgMagenta.white);
    
})
