/* logger foos */
const chalk = require("chalk");

function info(...text) {
  console.log(chalk.blue(...text));
}

function warn(...text) {
  console.log(chalk.yellow(...text));
}

function error(...text) {
  console.log(chalk.red(...text));
}

module.exports = {
  info,
  warn,
  error
}
