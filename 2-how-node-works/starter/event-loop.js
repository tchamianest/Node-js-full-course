const fs = require("fs");

setTimeout(() => console.log("timer 1 output"), 0);
setImmediate(() => console.log("immediate 1 text"));

const read = fs.readFile(
  `${__dirname}/2-how-node-works/starter/test-file.txt`,
  () => {
    console.log("accesible file succes ful");
  }
);
console.log(read);
