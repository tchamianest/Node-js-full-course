const EventEmitter = require("events");
const http = require("http");
const url = require("url");

//// by using ES6 we can extend our class and creeate new class called Sales
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myemitter = new Sales();

myemitter.on("newSale", (scare) => {
  console.log(`the new sale itemis ${scare} in the stock `);
});
myemitter.emit("newSale", 9);

////////////////////////////////////////////////////////////////////////////////////////////////
//creation of simple server with listern to server

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("first request was recevied");
  console.log(req.url);
  res.end("welcome to our web app");
});

server.on("request", (req, res) => {
  console.log("you clicked 😂");
  //   res.end("you clicke some where");
});

server.listen(3000, "127.0.0.1");
