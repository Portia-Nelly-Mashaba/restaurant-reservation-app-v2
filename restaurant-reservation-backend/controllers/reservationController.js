const Reservation = require("../models/Reservation");
const Restaurant = require("../models/Restaurant");

exports.createReservation = async (req, res) => {
  try {
    const { user, restaurant, date, time, guests } = req.body;

    const reservation = new Reservation({ user, restaurant, date, time, guests });
    await reservation.save();

    res.status(201).json({ message: "Reservation created", reservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("user").populate("restaurant");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
