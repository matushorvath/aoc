const data = require('fs').readFileSync('input', 'utf8').trim().split('\n');

for (var ch = 0; ch < data.length; ch++) {
    if (data[ch].substr(0, 3) !== 'jmp') {
        continue;
    }
    const xxx = data[ch].match(/(nop|acc|jmp) ([+-]\d+)/);

    data[ch] =`nop ${xxx[2]}`

    console.log('ch', ch, data);

    let ip = 0;
    let acc = 0;
    const seen = {};

    while (true) {
        if (seen[ip]) {
            break;
        }
        if (ip === data.length) {
            console.log('->', acc);
            process.exit(0);
        }
        seen[ip] = true;
        const m = data[ip].match(/(nop|acc|jmp) ([+-]\d+)/);
        const delta = parseInt(m[2], 10);

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
    data[ch] =`jmp ${xxx[2]}`


}
