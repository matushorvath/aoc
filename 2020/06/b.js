const data = require('fs').readFileSync('input', 'utf8').trim().split('\n\n')
    .map(g => g.split('\n')
        .reduce(([gln, gan], tan) => [
            gln + 1,
            Object.assign({}, gan, ...tan.split('').map(ans => ({ [ans]: (gan[ans] || 0) + 1 })))
        ], [0, {}]))
    .reduce((res, [gln, gan]) => res + Object.entries(gan).filter(([k, v]) => v === gln).length, 0);

console.log(JSON.stringify(data));
