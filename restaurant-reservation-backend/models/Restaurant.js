const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  cuisine: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reservationSlots: [{ date: String, time: String, isAvailable: Boolean }],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
