const { add, addAndMult } = require("./lib/add");
const { diff, diffAnother } = require("./lib/diff");

require("./lib/mult");
require("./lib/patch");

console.log("Hello world!");
console.log("add: 2 + 3 =", add(2, 3));
console.log("addAndMult: (2 + 3) * 2 * 3 =", addAndMult(2, 3));
console.log("diff: 2 - 3 =", diff(2, 3));
console.log("diffAnother: 2 - 3 - 5 =", diffAnother(2, 3, 5));
console.log("mult: 2 * 3 =", mult(2, 3));
