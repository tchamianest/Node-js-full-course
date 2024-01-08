const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const UserRouter = require('./routes/userRouter');

const app = express();

//// mild way for accepting
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//// how create the meddleware

//CALL MORGAN MODULE
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  console.log('Hello from the meadle ware🫲');
  next();
});

//another middle ware for the time use when we need to test
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// app.get('/', (req, res) => {
//   // here we can create a simple jason
//   res.status(200).json({
//     message: 'welcome to our betiful server',
//     app: 'natous',
//     author: 'tchami',
//   });
// });
// first load the the data from the tours

/// CREATE USER FUNCTION

// console.log(tours);
// app.get('/api/v1/tours', getallturs);

/// how we can handle the request with the id

// app.get('/api/v1/tours/:id', getonetour);

/// how to post something
// app.post('/api/v1/tours', postnewtour);

// how we can update the api info
// app.patch('/api/v1/tours/:id', updatetours);

/// how to use delete methode for delete the things from database
// app.delete('/api/v1/tours/:id', deletetour);

///we can us order router to not repeat ourself

///MOUNTING ROUTER
// const UserRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', UserRouter);

// UserRouter.route('/').get(getalluser).post(createuser);
// UserRouter.route('/:id').get(getUser).patch(updateuser).delete(deleteuser);

/// user router

//ROUTER
// app.route('/api/v1/tours').get(getallturs).post(postnewtour).delete(deletetour);

// //with id
// app
//   .route('/api/v1/tours/:id')
//   .get(getonetour)
//   .patch(updatetours)
//   .delete(deletetour);

/// accessing router based on router of user
// app.route('/api/v1/users').get(getalluser).post(createuser);
// app
//   .route('/api/v1/users/:id')
//   .get(getUser)
//   .patch(updateuser)
//   .delete(deleteuser);
//listening to the serve

module.exports = app;
