const { Readable } = require('stream');

class Counter extends Readable {
    constructor(opt) {
        super(opt);

        this._max = 1000;
        this._index = 0;
    }

    _read() {
        this._index += 1;

        if (this._index > this._max) {
            this.push(null);
        } else {
            const buf = Buffer.from(`${this._index}`, 'utf8');

            console.log(`Added: ${this._index}. Could be added? `, this.push(buf));
        }
    }
}

const counter = new Counter({ highWaterMark: 2 });

// DOESN'T WORK PROPERLY
// console.log(`Received: ${counter.read().toString()}`);

// IT WORKS
// counter.on('data', chunk => {
//     console.log('Received: ', chunk.toString());
// });