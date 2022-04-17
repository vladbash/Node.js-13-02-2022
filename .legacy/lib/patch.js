const chalk = require("chalk");

const log = console.log;

log("PATCHED!");

const COLORS = ["red", "green", "blue"];

let i = 0;
global.console.log = (...args) => {
    log("--- ", chalk[COLORS[i]](...args), " ---");
    debugger;
    if (i >= COLORS.length - 1) {
        i = 0;
    } else { 
        i++;
    }
};