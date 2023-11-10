const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // here we can create a simple jason
  res
    .status(200)
    .json({
      message: 'welcome to our betiful server',
      app: 'natous',
      author: 'tchami',
    });
});

app.listen(port, () => {
  console.log(`this is the message from server port${port}...`);
});
