const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("../../models/toursmodels");
dotenv.config({ path: `./Config.env` });

const DB = process.env.DATABASE_CONECT_URL.replace(
  "<PASSWORD>",
  process.env.DATABASEPASSWORD,
);

///connecting my mongo ddb
console.log(DB);
mongoose
  .connect(DB)
  .then((con) => {
    console.log(con.connect);
    console.log("Our db are connected succeful");
  })
  .catch((err) => {
    console.log(err.message);
    console.log("error happening");
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"),
);

// SIMPLE FUNCTION TO CREATE DATA INTO DATABASE

const insertDataintoDB = async () => {
  try {
    await Tour.create(tours);
    console.log("data succeful added to database");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

////CHECK FOR DUPLICATED DATA

const deleteAll = async () => {
  try {
    await Tour.deleteMany();
    console.log("data succeful deleted to database");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === "--import") {
  //USE THIS TO IMPORT
  insertDataintoDB();
} else if (process.argv[2] === "--delete") {
  //call this to delete
  deleteAll();
}

////HOW TO SET IT
// node dev-data/data/importdatatodb.js --import

//use magic to run some function into same file
console.log(process.argv);
