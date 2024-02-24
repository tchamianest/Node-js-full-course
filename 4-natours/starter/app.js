const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRouter");
const UserRouter = require("./routes/userRouter");

const app = express();

//// mild way for accepting
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  console.log("Hello from the meadle ware🫲");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", UserRouter);

module.exports = app;
