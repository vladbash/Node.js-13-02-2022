const { Router } = require('express');
const path = require('path');

const dashboard = Router();
const extend = Router();

dashboard.get('/', (req, res) => {
    res.send('GET dashboard');
});

dashboard.post('/', (req, res) => {
    res.send('POST dashboard');
});

extend.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/assets/index.html'));
});

dashboard.use('/extend', extend); 

module.exports = dashboard;