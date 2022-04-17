const express = require('express');
const config = require('config');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { port } = config.get('server');

const app = express();

app.locals = {
    messages: [
        {
            name: 'John Wick',
            content: 'Hello!'
        }
    ],
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.set('trust proxy', 1);

app.use(session({
    secret: config.get('sessionSecret'),
    resave: false,
    saveUninitialized: true,
}));

app.use(cookieParser(config.get('cookieSecret')));
app.use('/assets', express.static(path.join('public', 'assets')));

app.get('/', (req, res) => {
    // res.cookie('introduced', true, { httpOnly: true });

    // res.cookie(
    //     'username',
    //     cookieParser.signedCookie('JohnDoe', config.get('cookieSecret')),
    //     { signed: true }
    // );

    console.log(req.session);

    req.session.views = (req.session.views || 0) + 1;

    res.render('index', {
        username: 'John',
        views: req.session.views,
        items: [
            {
                value: 'Do hw',
                date: new Date().toISOString(),
            },
            {
                value: 'Visit lecture',
                date: new Date().toISOString(),
            }
        ]
    });
});

app.get('/dashboard', (req, res) => {
    console.log(req.cookies);
    const { introduced } = req.cookies;

    console.log(req.signedCookies);

    res.render('dashboard', { introduced });
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send('Logged out!');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});