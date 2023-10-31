// let learn about the module

////1 reading file sytem module
const fs = require("fs");
const http = require("http");
const url = require("url");

// console.log(fs);

/////////////////////////////////////////////////////////////////////////
/////////////// reding file

// const hello = "Hello world";
// console.log(hello);

/// how to read file in

// const word = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(word);

// const textout = `The avocado is good and also ${word} \n created on: ${Date.now()} by Tchami anest`;

// how to write the file into node
// fs.writeFileSync("./txt/newtest.txt", textout);
// console.log(fs.readFileSync("./txt/newtest.txt", "utf-8"));

/////⚠️⚠️⚠️⚠️⚠️⚠️⚠️blocking code with synchronous ⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// fs.writeFileSync("./txt/newtest.txt", textout);
// console.log(fs.readFileSync("./txt/newtest.txt", "utf-8"));
/////⚠️⚠️⚠️⚠️⚠️⚠️⚠️ end oblocking code with synchronous ⚠️⚠️⚠️⚠️⚠️⚠️⚠️

/////⚠️⚠️⚠️⚠️⚠️⚠️⚠️Non blocking code with asynchronous⚠️⚠️⚠️⚠️⚠️⚠️⚠️

//exmple 1

// fs.readFile("./txt/newtest.txt", "utf-8", (err, dat) => {
//   console.log(`error is:${err}`);
//   console.log(`data is:${dat}`);
// });

//example 2
// fs.readFile("./txt/start.txt", "utf-8", (err, dat) => {
//   fs.readFile(`./txt/${dat}.txt`, "utf-8", (err, data1) => {
//     console.log(data1);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         `./txt/final.txt`,
//         `${data1}\n second ⌚${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("you are writing succeful😒");
//         }
//       );
//     });
//   });
// });

// fs.readFile("./txt/final.txt", "utf-8", (err, dataw) => {
//   console.log(dataw);
// });
/////⚠️⚠️⚠️⚠️⚠️⚠️⚠️End of Non blocking code with asynchronous⚠️⚠️⚠️⚠️⚠️⚠️⚠️

////////////////////////////////////////////////////////////////////////////////////////////////
////////////// create simple server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); //call use isync in order to run one time and store it
// to change our information
const dataobj = JSON.parse(data);
const server = http.createServer((req, res) => {
  //   console.log(req);
  //   res.end("Hello from sereve HAHA!!");
  const path = req.url;
  if (path === "/" || path === "/home") {
    res.end("you are on Home page !");
  } else if (path === "/product") {
    res.end("you are on product name @");
  } else if (path === "/dashboard") {
    res.end("you are on Dashboard page");

    //// building simple api
  } else if (path === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });

    //this is the same as to respond the data before chang it
    // res.end(JSON.stringify(informatino));

    /// out put use the outiside infromation
    res.end(data);

    //// we need to call this file outside in order to prevent recalling evry time

    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const informatino = JSON.parse(data);
    //   res.writeHead(200, { "Content-type": "application/json" });

    //   //this is the same as to respond the data before chang it
    //   res.end(JSON.stringify(informatino));
    // });

    /// end of simple api
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello word",
    });
    res.end("<h1>this page not fund !</h1>\n<h4>Tchami page</h4");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("waiting for request");
});
