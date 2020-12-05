const data = require('fs').readFileSync('input', 'utf8').trim().split('\n')
    .map(l => l.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1'))
    .map(n => parseInt(n, 2))
    .sort((a, b) => a - b);

console.log(JSON.stringify(data));
