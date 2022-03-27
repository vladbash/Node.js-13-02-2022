const fs = require('fs');

// Implement copying of content from one file to a new one via stream pipes

const readable$ = fs.createReadStream('./cat.jpeg');
const writable$ = fs.createWriteStream('./cat-clone.jpeg');

// [??stream??].pipe(steam);

readable$.pipe(writable$);

// 

// readable$.on('data', chunk => {
//     console.log(chunk);
//     writable$.write(chunk);
// });

// readable$.on('end', () => {
//     writable$.end();
// });
