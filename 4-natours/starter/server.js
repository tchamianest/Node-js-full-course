const dotenv = require("dotenv");
const mongoose = require("mongoose");
// console.log(app.get('env'));

dotenv.config({ path: `./Config.env` });
const app = require("./app");
const port = process.env.PORT;
// getting my password

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

app.listen(port, () => {
  console.log(`this is the message from server port${port}...`);
});
