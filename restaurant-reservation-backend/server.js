const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config(); 



const app = express();
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(morgan("dev")); // Log requests to the console for debugging

// Import Routes
const reservationRoutes = require("./routes/reservationRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const authRoutes = require("./routes/authRoutes");


// Use Routes
app.use("/api/reservations", reservationRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    // Check if MONGO_URI is defined in the .env file
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined in the .env file");
      process.exit(1); // Stop the application if MONGO_URI is missing
    }

    // Attempt to connect to MongoDB using the URI from the .env file
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Start the server after successful connection
    const port = process.env.PORT || 3000; // Use the port from .env, default to 3000
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on http://192.168.1.31:${port}`);
    });
    
    
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Stop the application if there's an error with the database connection
  }
};

// Call the function to connect to MongoDB
connectToDatabase();
