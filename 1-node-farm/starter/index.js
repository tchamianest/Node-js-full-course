// let learn about the module

////1 reading file sytem module
const fs = require("fs");

// console.log(fs);

// const hello = "Hello world";
// console.log(hello);

/// how to read file in

const word = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(word);

const textout = `The avocado is good and also ${word} \n created on: ${Date.now()} by Tchami anest`;

// how to write the file into node
fs.writeFileSync("./txt/newtest.txt", textout);
console.log(fs.readFileSync("./txt/newtest.txt", "utf-8"));
