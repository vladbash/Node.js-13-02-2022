const { Writable } = require('stream');
const { once } = require('events');

class Counter extends Writable {
    _write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
}


const counter = new Counter({ highWaterMark: 2 });

for (let i = 1; i < 1000; i += 1) {
  counter.write(Buffer.from(`${i}`, 'utf8'));
}