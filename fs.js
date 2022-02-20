const fs = require('fs');
const path = require('path');

// console.log(__dirname);
// console.log(__filename);

// console.log(path.join(__dirname, 'package.json'));

// // const result = fs.readdirSync(__dirname);

// console.log(JSON.stringify(result));

// fs.readdir(__dirname, (err, data) => {
//     if (err) process.exit(1);
//     console.log(data);
// });


function foo(a, b) {
    console.log(a + ' ' + b);
}

const obj = { name: 'test' };

foo('foo', obj);