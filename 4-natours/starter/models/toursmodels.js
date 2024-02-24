const mongoose = require("mongoose");
//// creating first schemma
const tourSchemma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "the name of tour is condirion tobe avilable"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    require: [true, "tour need tohave the duration"],
  },
  maxGroupSize: {
    type: Number,
    require: [true, "Tours must have the number of group member"],
  },
  difficulty: {
    type: String,
    require: [true, "a tour must have the diffculty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.6,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "add price for the tour "],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    require: [true, "A tour must have the summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  guides: {
    type: [String],
  },
  imageCover: {
    type: String,
    require: [true, "image must have the name of image"],
  },
  images: [String],
  startDates: {
    type: [String],
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  startDatesArray: [Date],
});
const Tour = mongoose.model("Tour", tourSchemma);
module.exports = Tour;
