const chalk = require('chalk');

const logRequest = (req) => {
    console.log(`${chalk.green(`[${new Date().toISOString()}]`)} ${req.url}`);
};

module.exports = {
    logRequest
};