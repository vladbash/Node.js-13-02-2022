const express = require('express');
const config = require('config');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { appRouter, apiRouter } = require('./src');

const app = express();

app.locals = {
    auth: false
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('trust proxy', 1);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(session({
    secret: config.get('session.secret'),
    resave: false,
    saveUninitialized: true,
}));

app.use('/assets', express.static(path.join('public', 'assets')));
app.use('/api', apiRouter);
app.use('/', appRouter);

// As a variant
// mongoose.set('bufferCommands', true);
mongoose.connect(config.get('db.connectionString'))
    .then(() => {
        app.listen(config.get('http.port'), () => {
            console.log(`Server is running on http://localhost:${config.get('http.port')}`);
        });
    }).catch(e => {
        console.error('Connection error: ', e);
    });