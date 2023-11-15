const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.json());
// app.get('/', (req, res) => {
//   // here we can create a simple jason
//   res.status(200).json({
//     message: 'welcome to our betiful server',
//     app: 'natous',
//     author: 'tchami',
//   });
// });
// first load the the data from the tours

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

///refactorie our code

const getallturs = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    tours,
  });
};

const getonetour = (req, res) => {
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

const postnewtour = (req, res) => {
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

const updatetours = (req, res) => {
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

const deletetour = (req, res) => {
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
// console.log(tours);
app.get('/api/v1/tours', getallturs);

/// how we can handle the request with the id

app.get('/api/v1/tours/:id', getonetour);

/// how to post something
app.post('/api/v1/tours', postnewtour);

// how we can update the api info
app.patch('/api/v1/tours/:id', updatetours);

/// how to use delete methode for delete the things from database
app.delete('/api/v1/tours/:id', deletetour);

//listening to the serve
app.listen(port, () => {
  console.log(`this is the message from server port${port}...`);
});
