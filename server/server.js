import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import testRoutes from './routes/testRoutes.js';
import restaurantRouter from './routes/restaurantRouter.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// Initialize Express app
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));

// Routes
app.use('/api', testRoutes);
app.use('/api/user', userRoutes);
app.use('/api/restaurant', restaurantRouter);  // ✅ Fixed route issue

// Default route
app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to Restaurant Reserve App by Portia</h1>");
});

// Set port
const PORT = process.env.PORT || 3008;

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on PORT ${PORT} in ${process.env.NODE_ENV} mode`.bgMagenta.white);
});
