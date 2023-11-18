const app = require('./app');
const dotenv = require('dotenv');
const port = 3000;

dotenv.config({ path: `./Config.env` });
console.log(process.env);

app.listen(port, () => {
  console.log(`this is the message from server port${port}...`);
});
