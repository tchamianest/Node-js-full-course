const Tour = require("../models/toursmodels");
const APIFeature = require("../utitls/apiFeatures");
// midware for check the body
////REFACTORY WITH CLASS CONTAIN ALL MY QUERIE

exports.getallturs = async (req, res) => {
  try {
    const query = Tour.find();
    const flterPage = new APIFeature(query, req.query)
      .filter()
      .sort()
      .limitField()
      .pagination();
    const tours = await flterPage.query;
    ////SEND RESPONSE TO SERVER

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      numbers: tours.length,
      result: tours,
    });
  } catch (err) {
    res.status(500).json({
      status: "bad server error",
      message: err.message,
    });
  }
};

exports.getonetour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(201).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail request",
      message: err.message,
    });
  }
};

exports.postnewtour = async (req, res) => {
  try {
    // const newtours = new Tour({});
    // await newtours.save();

    const neewtour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: neewtour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
exports.updatetours = async (req, res) => {
  try {
    const tourupdate = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success Update",
      data: {
        tour: tourupdate,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail to update",
      error: err.message,
    });
  }
};
exports.deletetour = async (req, res) => {
  try {
    const tourdeleted = await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success delete",
      message: tourdeleted,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail to update",
      error: err.message,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.2 } },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);
    res.status(200).json({
      status: "success statistics",
      stats,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail to update",
      error: err.message,
    });
  }
};
