const { Writable } = require('stream');
const { once } = require('events');
const fs = require('fs');

// DEMO 1: Abstract Writable Stream
{
    class Counter extends Writable {
        _write(chunk, encoding, callback) {
            console.log(chunk.toString());
            callback();
        }
    }


    const counter = new Counter({ highWaterMark: 2 });

    // Good
    // for (let i = 1; i < 1000; i += 1) {
    //   counter.write(Buffer.from(`${i}`, 'utf8'));
    // }

    // Better
    // (async () => {
    //     for (let i = 1; i < 1000; i += 1) {
    //         const canWrite = counter.write(Buffer.from(`${i}`, 'utf8'));

    //         console.log(`Can we write bunch of data? ${canWrite}`);

    //         if (!canWrite) {
    //             await once(counter, 'drain');
    //             console.log('drain event fired.');
    //         }
    //     }
    // })();
}

// DEMO 2: File Writable Stream
{
    // const writeStream = fs.createWriteStream('./writableStreamDemo.txt', { encoding: 'utf-8' });

    // writeStream.on('finish', () => {
    //     console.log('[STREAM FINISHED]');
    // });

    // writeStream.on('error', (err) => {
    //     console.log('[STREAM ERROR]', err);
    // });

    // writeStream.on('close', () => {
    //     console.log('[STREAM CLOSED]');
    // });

    // writeStream.write('data');

    // writeStream.destroy();

    // writeStream.write('new data');

    // writeStream.end('data ended');
}