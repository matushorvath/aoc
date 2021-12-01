console.log(require('fs')
    .readFileSync('input', 'utf8')
    .split(/\r?\n/)
    .map(Number)
    .reduce((c, _, i, d) => c + (d[i] > d[i-3]), 0)
);
