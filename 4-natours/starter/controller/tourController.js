const Tour = require("../models/toursmodels");

// midware for check the body

exports.getallturs = async (req, res) => {
  try {
    console.log(req.query);
    //// USE THE QUERY FILTERING
    //1A)simple  Filtering
    const queryObj = { ...req.query };
    const dontPassFilterArray = ["page", "sort", "fields"];
    dontPassFilterArray.forEach((el) => delete queryObj[el]);

    // 1B)Advanced Filtering
    ///{difficulty:'easy',duration:{$gte:5}} this can filter which have duration greater than 5
    //{ page: '2', sort: '10', duration: { gte: '5' } } from console
    let querStr = JSON.stringify(queryObj);
    //CHANGE ALL REQUEST FROM QUERY REQUEST TO MATCH DATABASE
    querStr = querStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const finalFilter = JSON.parse(querStr);
    // console.log(req.query, queryObj);
    //simple way for building the query na d filter
    // const tours = await Tour.find({ duration: 5, difficulty: "easy" });

    ///SECOOND WAY work as first but it difficult

    let query = Tour.find();
    ///EXECUTE QUERY IN PROFESSION WAY
    console.log(req.query);

    //2) SORTING
    if (req.query.sort) {
      //second option
      const sortBy = req.query.sort.split(",").join(" ");
      // query = query.sort(req.query.sort);

      // ADVANCED SORTING
      query = query.sort(sortBy);
    } else {
      query = query.sort("-startDate");
    }

    ///4)FIELD LIMITING
    // 127.0.0.1:3000/api/v1/tours?fields=name,duration,price
    if (req.query.fields) {
      const fieldsdisplay = req.query.fields.split(",").join(" ");
      query = query.select(fieldsdisplay);
    } else {
      query = query.select("-__v");
    }

    // 5)PAGINATION
    const page = req.query.page * 1 || 1;
    const limits = req.query.limit * 1 || 100;
    const skip = (page - 1) * limits;
    console.log(skip, page, limits);
    //meaning skip 10 is to jump 10 on page 1:0-10
    query = query.skip(skip).limit(limits);
    console.log(limits);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();

      if (skip >= numTours) throw new Error("this page does not exists");
    }
    const tours = await query;
    // const tours = await Tour.find()
    //   .where("duration")
    //   .equals("5")
    //   .where("difficulty")
    //   .equals("easy");

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
