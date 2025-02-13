import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import socialRoutes from "./routes/socialRoutes.js";
import createReviewRoutes from "./routes/createReviewControllerRoutes.js";
import menuRoutes from './routes/menuRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";

// dotenv configuration
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
app.use(morgan("dev"));
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"], // Adjust based on your frontend URL
        credentials: true,
    })
);
app.use(cookieParser());
app.use(fileUpload());

// Routes


// Use the route in your app
app.use('/api', menuRoutes);
app.use("/api", categoryRoutes);
app.use("/api", socialRoutes);
app.use("/api", testRoutes);
app.use("/api/user", userRoutes);
app.use("/api", createReviewRoutes);
console.log("Restaurant routes are registered");
app.use('/api', restaurantRoutes);


app.get("/", (req, res) => {
    return res
        .status(200)
        .send("<h1>Welcome To Restaurant Reserve App by Portia</h1>");
});

// Catch-all for unmatched routes
app.use((req, res, next) => {
    res.status(404).send({
        success: false,
        message: `Route ${req.originalUrl} not found.`,
    });
});

// Port
const PORT = process.env.PORT || 8080;

// Listen on all network interfaces (0.0.0.0)
app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `🚀 Server Running on http://192.168.8.199:${PORT} in ${process.env.NODE_ENV} mode`
            .bgBlue.white
    );
});
