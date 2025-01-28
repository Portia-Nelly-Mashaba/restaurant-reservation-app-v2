const Restaurant = require("../models/Restaurant");

exports.addRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine, admin, reservationSlots } = req.body;

    const restaurant = new Restaurant({ name, location, cuisine, admin, reservationSlots });
    await restaurant.save();

    res.status(201).json({ message: "Restaurant added", restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("admin");
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
