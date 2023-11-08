// console.log(arguments);
// console.log(require("module").wrapper);

//// call your module class you calcuarte

const C = require("./testmodule1");
// fisrt assign to module

const calc1 = new C();
console.log(calc1.add(2, 5));
console.log(calc1.multiply(2, 5));
console.log(calc1.divide(2, 5));

//second assign to module
const calc2 = new C();
console.log(calc2.add(9, 8));

//call from module 2 use ESC 6
const { add, multiply, division } = require("./testmodule2");
console.log(add(3, 5));
console.log(multiply(3, 5));
console.log(division(3, 5));

//// or other way///////////////
const calc3 = require("./testmodule2");
console.log(calc3.add(5, 4));

///cacher
require("./cachemodule")();
require("./cachemodule")();
require("./cachemodule")();
