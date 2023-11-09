import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

//const dist = 1000;
const dist = 2503;

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./);
    return {
        name: m[1],
        speed: Number(m[2]),
        fly: Number(m[3]),
        rest: Number(m[4])
    };
});

const results = {};

for (const { name, speed, fly, rest } of data) {
    const cycles = Math.floor(dist / (fly + rest));
    const mod = dist % (fly + rest);
    results[name] = cycles * fly * speed + Math.min(mod, fly) * speed;
}

console.log('result', results);
