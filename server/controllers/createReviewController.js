import reviewModel from "../models/reviewModel.js";

export const createReviewController = async (req, res) => {
    try {
        const { user, restaurant, food, comments, ratings } = req.body;

        // Check if the required fields are provided
        if (!user || !comments || !ratings) {
            return res.status(400).send({
                success: false,
                message: "User, comments, and ratings are required fields.",
            });
        }

        // Create a new review
        const newReview = new reviewModel({
            user,
            restaurant,
            food,
            comments,
            ratings,
        });

        // Save the review to the database
        const savedReview = await newReview.save();

        res.status(201).send({
            success: true,
            message: "Review created successfully",
            review: savedReview,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while creating review",
            error,
        });
    }
};
