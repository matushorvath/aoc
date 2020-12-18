const a = require('./a');
const b = require('./b');

const input = require('fs').readFileSync('input', 'utf8').trim();

console.log(a.parse(input));
console.log(b.parse(input));
