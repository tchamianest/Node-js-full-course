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
// console.log(tours);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    tours,
  });
});

/// how to post something
app.post('/api/v1/tours', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`this is the message from server port${port}...`);
});
