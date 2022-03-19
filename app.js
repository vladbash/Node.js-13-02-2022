// Lecture 1
// const { add, addAndMult } = require("./lib/add");
// const { diff, diffAnother } = require("./lib/diff");

// require("./lib/mult");
// require("./lib/patch");

// console.log("add: 2 + 3 =", add(2, 3));
// console.log("addAndMult: (2 + 3) * 2 * 3 =", addAndMult(2, 3));
// console.log("diff: 2 - 3 =", diff(2, 3));
// console.log("diffAnother: 2 - 3 - 5 =", diffAnother(2, 3, 5));
// console.log("mult: 2 * 3 =", mult(2, 3));


// Lecture 2

const chalk = require('chalk');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const demoEvents = require('./ee');

const argv = yargs(hideBin(process.argv)).argv;

// console.log(argv);

const COLOR = argv.color;

console.log(process.argv);

console.log(chalk[COLOR](process.env.MONGO_URI, process.env.HTTP_PORT));

let processing = true;

const interval = setInterval(() => {
    if (processing) {
        console.log('Searching...');
    }
}, 1000);

const timer = setTimeout(() => {
    console.log('Hoora!!! I have found!');
    processing = false;
    clearInterval(interval);
}, 5000);

// clearTimeout(timer);

setImmediate(() => {
    console.log('immediate');
});

// HW - process.nextTick();

demoEvents.addListener('data', (payload) => {
    console.log('app.js ', payload);
});

demoEvents.emit('init');