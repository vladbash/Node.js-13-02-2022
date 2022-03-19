const { info, warn, error } = require("./utils/logger");

console.log("---------------------");
console.log("     Sample text:    ");
console.log("---------------------");

info("This is first info message","Another info message");
// debugger;
warn("This is warning message");
// debugger;
error("This is error message");
