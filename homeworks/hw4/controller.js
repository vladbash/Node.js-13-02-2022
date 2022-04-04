const fs = require('fs');
const path = require('path');
const querystring = require('query-string');

const assets = (req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost');
    fs.createReadStream(path.join(__dirname, pathname))
        .pipe(res);
};

const index = (req, res, payload) => {
    let params = {};
    if (payload) {
        params = { ...payload };
    } else {
        const { search } = new URL(req.url, 'http://localhost');
        params = querystring.parse(search);
    }

    const file$ = fs.createReadStream('./index.html', { encoding: 'utf-8' });
    let template = '';

    file$.on('data', chunk => {
        template += chunk;
    });

    file$.on('end', () => {
        console.log('file end');
        template = Object
            .keys(params)
            .reduce(
                (result, key) => result.replace(new RegExp(`\{\%${key}\%\}`, 'g'), params[key]),
                template
            );

        res.end(template);
    });

    file$.on('close', () => {
        console.log('file close');
    });

    file$.on('error', err => {
        console.error(err);

        res.statusCode = 500;
        res.end();
    });
};

module.exports = {
    assets,
    index
};