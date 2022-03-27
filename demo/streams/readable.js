const { Readable } = require('stream');
const fs = require('fs');
const chalk = require('chalk');

// DEMO 1: Abstract Readable Stream

{
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

    // IT WORKS, BUT WITH ERROR
    // counter.on('readable', () => {
    //     console.log(`Received: ${counter.read().toString()}`);
    // });

    // IT WORKS
    // counter.on('data', chunk => {
    //     console.log('Received: ', chunk.toString());
    // });

}

// DEMO 2: File Readable Stream
{
    // const readStream = fs.createReadStream('./demo.txt', { encoding: 'utf-8', highWaterMark: 128 });

    // readStream.on('readable', () => {
    //     console.log(chalk.blue('[readable] Received:'), readStream.read());
    //     // readStream.destroy();
    // });

    // readStream.on('data', chunk => {
    //     console.log(chalk.green('Received: '), chunk);
    // });

    // readStream.on('end', () => {
    //     console.log(chalk.red('FILE WAS READ'));
    // });

    // readStream.on('close', () => {
    //     console.log(chalk.red('STREAM WAS CLOSED'));
    // });
}