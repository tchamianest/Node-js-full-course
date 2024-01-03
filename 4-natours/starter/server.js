const dotenv = require('dotenv');
// console.log(app.get('env'));

dotenv.config({ path: `./Config.env` });
const app = require('./app');
const port = process.env.PORT;
// console.log(process.env);
//GET INFORMATION FROM ENV ////////////////

// const name = process.env.PASSWORD;
// console.log(name);

app.listen(port, () => {
  console.log(`this is the message from server port${port}...`);
});
