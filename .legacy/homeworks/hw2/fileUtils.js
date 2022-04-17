const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const { promisify } = require('util');
const EventEmitter = require('events');

class ExtEventEmitter extends EventEmitter {
    constructor(options) {
        super(options);
        this._verbose = false;
    }

    setVerbose(value) {
        console.warn(`[ExtEventEmitter] Verbose mode: ${!!value}`);
        this._verbose = value;
    }

    putLogsToFile(event, ...payload) {
        fs.writeFile('./events.log', `[${new Date().toISOString()}][${event}] ${payload}\n`, { flag: 'a+' }, (err) => {
            console.error(err);
        });
    }

    emit(event, ...args) {
        this._verbose && this.putLogsToFile(event, ...args);
        return super.emit(event, ...args);
    }
}

const notifications = new ExtEventEmitter();

// let _verbose = false;

// function putLogsToFile(event, ...payload) {
//     fs.writeFile('./events.log', `[${new Date().toISOString()}][${event}] ${payload}\n`, { flag: 'a+' }, (err) => {
//         console.error(err);
//     });
// }

// function setVerbose(value) {
//     console.warn(`verbose mode: ${value}`);
//     _verbose = value;
// }

function seekSync(dir, file) {
    try {
        fs.accessSync(dir);
    } catch {
        notifications.emit('error', new Error(`Directory doesn't exist`));
    }

    const files = fs.readdirSync(dir);

    if (files.includes(file)) {
        notifications.emit('success', path.join(dir, file));
    } else {
        notifications.emit('error', new Error(`File doesn't exist`));
    }
}

// function seek(dir, file) {
//     const _emitter = new EventEmitter();
//     fs.access(dir, err => {
//         if (err) {
//             _emitter.emit('error', new Error(`Directory doesn't exist`));
//             return;
//         }

//         fs.readdir(dir, (err, files) => {
//             if (err) {
//                 _emitter.emit('error', err);
//                 return;
//             }
//             if (files.includes(file)) {
//                 _emitter.emit('success', path.join(dir, file));
//             } else {
//                 _emitter.emit('error', new Error(`File doesn't exist`));
//             }
//         });
//     });

//     return _emitter;
// }


// function seek(dir, file) {
//     const _emitter = new EventEmitter();
//     fs.access(dir, err => {
//         if (err) {
//             _emitter.emit('error', new Error(`Directory doesn't exist`));
//             return;
//         }

//         fs.readdir(dir, (err, files) => {
//             if (err) {
//                 _emitter.emit('error', err);
//                 return;
//             }
//             if (files.includes(file)) {
//                 _emitter.emit('success', path.join(dir, file));
//                 fs.readFile(path.join(dir, file), 'utf-8', (err, content) => {
//                     if (err) {
//                         _emitter.emit('error', err);
//                         return;
//                     }
//                     _emitter.emit('data', content);
//                 });
//             } else {
//                 _emitter.emit('error', new Error(`File doesn't exist`));
//             }
//         });
//     });

//     return _emitter;
// }

// function seek(dir, file) {
//     const _emitter = new EventEmitter();
//     // const access = new Promise((res, rej) => {
//     //     fs.access(dir, err => {
//     //         err ? rej(err) : res();
//     //     });
//     // });
//     const access = promisify(fs.access);
//     const readdir = promisify(fs.readdir);
//     const readFile = promisify(fs.readFile);

//     access(dir)
//         .then(() => {
//             return readdir(dir);
//         })
//         .then(files => {
//             if (files.includes(file)) {
//                 _emitter.emit('success', path.join(dir, file));
//                 return readFile(path.join(dir, file), 'utf-8');
//             }
//             throw new Error(`File doesn't exist`);
//         })
//         .then(content => {
//             _emitter.emit('data', content);
//         })
//         .catch(err => {
//             _emitter.emit('error', err);
//         });

//     return _emitter;
// }

// function seek(dir, file) {
//     const _emitter = new EventEmitter();

//     fsPromises.access(dir)
//         .then(() => {
//             return fsPromises.readdir(dir);
//         })
//         .then(files => {
//             if (files.includes(file)) {
//                 _emitter.emit('success', path.join(dir, file));
//                 return fsPromises.readFile(path.join(dir, file), 'utf-8');
//             }
//             throw new Error(`File doesn't exist`);
//         })
//         .then(content => {
//             _emitter.emit('data', content);
//         })
//         .catch(err => {
//             _emitter.emit('error', err);
//         });

//     return _emitter;
// }

async function seek(dir, file) {
    // const _emitter = new EventEmitter();
    try {
        await fsPromises.access(dir);
        const files = await fsPromises.readdir(dir);
        let content;
        if (files.includes(file)) {
            notifications.emit('success', path.join(dir, file));
            // _verbose && putLogsToFile('success', path.join(dir, file));
            content = await fsPromises.readFile(path.join(dir, file), 'utf-8');
            notifications.emit('data', content);
            // _verbose && putLogsToFile('data', content);
        } else {
            notifications.emit('err', `File doesn't exist`);
            // _verbose && putLogsToFile('err', `File doesn't exist`);
        }
    } catch (err) {
        console.log(err);
        notifications.emit('err', err);
        // _verbose && putLogsToFile('err', err);
    }

    // return _emitter;
}

module.exports = {
    seekSync,
    seek,
    notifications
};