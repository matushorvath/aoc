const data = require('fs').readFileSync('input', 'utf8').trim().split('\n\n')
    .map(g => g.replace(/[ \n]/g, '').split('')
        .reduce((p, c) => (p[c] = true, p), {}))
    .reduce((p, c) => p + Object.keys(c).length, 0);

console.log(JSON.stringify(data));
