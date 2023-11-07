const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

/// how to set the Thread you need
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("timer 1 output"), 0);
setImmediate(() => console.log("immediate 1 text"));

const read = fs.readFile(`test-file.txt`, () => {
  console.log("accesible file succes ful");
  console.log("---------------------------------");

  setTimeout(() => console.log("timer 2 output"), 0);
  setTimeout(() => console.log("timer 2 output"), 3000);
  setImmediate(() => console.log("immediate 2 text"));

  // process.next tick this callback function run before others
  process.nextTick(() => console.log("next tick"));

  // crypto call back
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password Encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password Encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password Encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password Encrypted");
  });
});
console.log("top lever code ------------");
