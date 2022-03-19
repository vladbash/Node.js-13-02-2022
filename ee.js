const EventEmitter = require('events');

const MyEventEmitter = new EventEmitter();

MyEventEmitter.addListener('data', payload => {
    console.log('first event listener: ', payload);
    // payload.name = 'Bob';
    payload = { surname: 'Doe' };
});

// const cb = payload => {
//     console.log('second event listener: ', payload);
//     MyEventEmitter.removeListener('data', cb);
// };

// // just first emit
// MyEventEmitter.addListener('data', cb);

MyEventEmitter.emit('data', { name: 'John' });

MyEventEmitter.once('data', payload => {
    console.log('second event listener: ', payload);
});

MyEventEmitter.on('init', payload => {
    console.log('init event listener: ', payload);
});

// MyEventEmitter.emit('init', { name: 'John' });

MyEventEmitter.emit('data', { name: 'Bob' });

module.exports = MyEventEmitter;