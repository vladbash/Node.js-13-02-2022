const yargs = require('yargs');
const fileUtils = require('./fileUtils');

const args = yargs(process.argv).argv;

if (!args.dir || !args.file) {
    console.error('--dir and --file arguments are required');
    process.exit(1);
}

// SYNC VERSION
// fileUtils.notifications.addListener('error', err => {
//     console.error('[FILE UTILS][ERROR]', err.toString());
// });

// fileUtils.notifications.addListener('success', file => {
//     console.log('[FILE UTILS][SUCCESS] file was found, ', file);
// });

// fileUtils.seekSync(args.dir, args.file);

// ASYNC VERSION
// fileUtils.seek(args.dir, args.file)
//     .addListener('error', err => {
//         console.error('[FILE UTILS][ERROR]', err.toString());
//     })
//     .addListener('success', file => {
//         console.log('[FILE UTILS][SUCCESS] file was found, ', file);
//     });

fileUtils.seek(args.dir, args.file);

fileUtils.notifications.addListener('err', err => {
    console.error('[FILE UTILS][ERROR]', err.toString());
});

fileUtils.notifications.addListener('success', file => {
    console.log('[FILE UTILS][SUCCESS] file was found,', file);
});

fileUtils.notifications.addListener('data', content => {
    console.log('[FILE UTILS][DATA]', content);
});