console.log('inited');

function add(a, b) {
    return a + b;
}

function addAndMult(a, b) {
    return (a + b) * a * b;
}

// exports.add = (a, b) => a + b;

module.exports = {
    add,
    addAndMult
};