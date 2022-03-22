function foo(arg) {
    console.log(`I've got ${arg}`);
}

setTimeout(() => {
    foo('something');
}, 2000);

setTimeout(foo, 2500, 'new one');

setInterval(foo, 1000, 'interval');
