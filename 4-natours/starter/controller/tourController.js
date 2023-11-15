const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.getallturs = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    tours,
  });
};

exports.getonetour = (req, res) => {
  // this can show us the request id that we receive from the serve
  // console.log(req.params);

  //convert the the recevied request from string to the number
  const idr = req.params.id * 1;

  // search for the tours which have the sam eid us what we want

  const tour = tours.find((el) => el.id === idr);

  /// check if the request exist

  // if (idr > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: `'Invalid Id':${idr}`,
    });
  }
  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.postnewtour = (req, res) => {
  const newid = tours[tours.length - 1].id + 1;
  const newpost = Object.assign({ id: newid }, req.body);
  tours.push(newpost);

  //write what we done into our tour abject
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).send({
        status: 'success',
        data: newpost,
      });
    }
  );
};

exports.updatetours = (req, res) => {
  console.log(tours.length);
  console.log(req.params.id);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'enter the proper ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tours: '<Data Updated>',
    },
  });
};

exports.deletetour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'enter the proper ID',
    });
  }
  res.status(204).json({
    status: 'success',
  });
};
