const data = require('fs').readFileSync('input', 'utf8').trim().split('\n');

let ip = 0;
let acc = 0;
const seen = {};

while (true) {
    if (seen[ip]) {
        console.log(acc);
        break;
    }
    seen[ip] = true;
    const m = data[ip].match(/(nop|acc|jmp) ([+-]\d+)/);
    const delta = parseInt(m[2], 10);
    //console.log(m[1], delta);

    switch (m[1]) {
        case 'nop':
            ip++;
            break;
        case 'acc':
            acc += delta;
            ip++;
            break;
        case 'jmp':
            ip += delta;
            break;
        default:
            throw 42;
    }
}
