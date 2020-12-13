const data = require('fs').readFileSync('input', 'utf8').trim().split('\n')
    .map(l => [l[0], parseInt(l.substr(1), 10)]);

let facing = 90;
let [x, y] = [0, 0];

for (const [i, d] of data) {
    switch (i) {
        case 'N': y += d; break
        case 'S': y -= d; break
        case 'E': x += d; break
        case 'W': x -= d; break
        case 'L': facing += d; facing = facing % 360; break;
        case 'R': facing += 360 - d; facing = facing % 360; break;
        case 'F':
            switch (facing) {
                case 180: y += d; break
                case 0: y -= d; break
                case 90: x += d; break
                case 270: x -= d; break
                default:
                    throw new Error(`facing ${facing}`);
            }
    }
}

console.log(x, y, Math.abs(x) + Math.abs(y));
