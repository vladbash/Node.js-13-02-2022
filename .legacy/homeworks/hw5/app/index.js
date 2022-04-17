const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const home = require('./api/home/controller');
const items = require('./api/items/controller');

const app = express();

app.use((req, res, next) => {
    console.log(`Request: {
        content-type: ${req.get('Content-Type')}
        url: ${req.url},
        method: ${req.method}
    }`);
    next();
});

app.use(bodyParser()); // middlewares

// app.use((req, res, next) => {
//     if (req.get('Content-Type') === 'application/json') {
//         let body = '';
//         req.on('data', (chunk) => {
//             body += chunk;
//         });

//         req.on('end', () => {
//             req.body = JSON.parse(body);
//             next();
//         });
//     } else {
//         next();
//     }
// });

app.use('/', home);
app.use('/items', items);

app.use(errors());

module.exports = app;