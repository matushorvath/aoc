const data = require('fs').readFileSync('input', 'utf8').trim().split('\n')
    .map(l => [l[0], parseInt(l.substr(1), 10)]);

let [wx, wy] = [10, 1];
let [x, y] = [0, 0];

for (const [i, d] of data) {
    switch (i) {
        case 'N': wy += d; break;
        case 'S': wy -= d; break;
        case 'E': wx += d; break;
        case 'W': wx -= d; break;
        case 'L': [wx, wy] = [-wy, wx]; break;
        case 'R': [wx, wy] = [wy, -wx]; break;
        case 'F': [x, y] = [x + d * wx, y + d * wy]; break;
    }
}

console.log(x, y, Math.abs(x) + Math.abs(y));
