const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  /// this is the normal way for reading information but couse the problem
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log("the is the error happening");
  //     console.log("reading our data ");
  //     res.write(data);
  //   });

  //////////// first streaming way but couse pproblem of back presure

  //   const redable = fs.createReadStream("testa-file.txt");
  //   redable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   redable.on("end", () => {
  //     // wehave to end it if it is done
  //     // console.log("End of reading data ");
  //     res.end();
  //   });

  //   /// what happen if there is error
  //   redable.on("error", (err) => {
  //     console.log(err); // display error happen
  //     res.statusCode = 500;
  //     res.end(`<h1>the file not exist</h1>`);
  //   });

  ////final best pratical way for stream with pipe
  const redable = fs.createReadStream("test-file.txt");
  redable.pipe(res);

  // readableSource(write result)
});

/// listerning from our server
server.listen(3000, () => {
  console.log("Listerning server.....");
});
