const { promises } = require('dns');
const fs = require('fs');
const supergent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`here we have: ${data}`);

//   // fetch image with supergent npm request
//   /// here we use callback hell/////////////////////////
//   supergent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);

//       fs.writeFile('data-image.txt', res.body.message, (err) => {
//         console.log('we write the file name on our file ');
//       });
//     });
// });
//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️instedy of hell use callback promises⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`here we have :${data}`);

  supergent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile('data2-image.txt', res.body.message, (err) => {
        console.log(`we alredy write the file 2`);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️instedy of hell use callback promises⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️Building the promises for the reading file⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
const readfilepro = (file) => {
  return new promises((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('this file is no longer exist');
      resolve(data);
    });
  });
};

//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️End of building promises for reading file⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
