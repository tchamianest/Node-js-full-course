const mongoose = require("mongoose");
//// creating first schemma
const tourSchemma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "the name of tour is condirion tobe avilable"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  price: {
    type: Number,
    required: [true, "add price for the tour "],
  },
});
const Tour = mongoose.model("Tour", tourSchemma);
module.exports = Tour;
