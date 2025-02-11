import socialModel from "../models/socialModel.js"; // Import the Social model

export const createSocialController = async (req, res) => {
    try {
        const { restaurant, facebook, instagram, twitter } = req.body;

        // Validate required fields
        if (!restaurant) {
            return res.status(400).send({
                success: false,
                message: "Restaurant is required.",
            });
        }

        // Create a new social media entry
        const newSocial = new socialModel({
            restaurant,
            facebook,
            instagram,
            twitter,
        });

        // Save the social media details
        const savedSocial = await newSocial.save();

        res.status(201).send({
            success: true,
            message: "Social media information created successfully",
            social: savedSocial,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while creating social media information",
            error,
        });
    }
};
