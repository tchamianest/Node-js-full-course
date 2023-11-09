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
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`here we have :${data}`);

//   supergent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('data2-image.txt', res.body.message, (err) => {
//         console.log(`we alredy write the file 2`);
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️instedy of hell use callback promises⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️Building the promises for the reading file⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

// read file promise
const readfilepro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('this file is no longer exist');
      resolve(data);
    });
  });
};

/// write file promise
const writefilepro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('we alredy write the file 2');
      resolve('success🙌');
    });
  });
};

// calling my promose redfile and use it and we improving it with some chainig

// readfilepro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`here we have :${data}`);

//     return supergent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     /// instead of use this ret use function
//     // fs.writeFile('data2-image.txt', res.body.message, (err) => {
//     //   console.log(`we alredy write the file 2`);
//     // });
//     return writefilepro('data2-image.txt', res.body.message);
//   })
//   .then(() => {
//     console.log(`we alredy write the file 2`);
//   })
//   /// this only one cathc can handle all then becouse we aall return the promises function
//   .catch((err) => {
//     console.log(err);
//   });
//   .catch((err) => {
//     console.log('Error ⚠️  check the name of file');
//   });

//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️End of building promises for reading file⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
//💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥

//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️use the async function ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
/// renew code without use then

const getdogphot = async () => {
  try {
    const photoname = await readfilepro(`${__dirname}/dog.txt`);
    console.log(`here we have :${photoname}`);
    const photolink = await supergent.get(
      `https://dog.ceo/api/breed/${photoname}/images/random`
    );
    console.log(photolink.body.message);
    await writefilepro('data2-image.txt', photolink.body.message);
    console.log(`we alredy write the file 2`);
  } catch (err) {
    console.log(err);
  }
  return 'yeah Ready💀';
};

// call getdogphot function
getdogphot();

// call it async to get this return value
(async () => {
  try {
    console.log(`we alredy write the file 2`);
    const x = await getdogphot();
    console.log(x);
    console.log(`we alredy write the file 2`);
  } catch (err) {}
})();

// when we have return insider the asyncy
/*
    getdogphot()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log('bUt insider the promise there is error');
    });
*/
//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️use the async function ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
