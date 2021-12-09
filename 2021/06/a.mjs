import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let fish = input.trimEnd().split(',').map(Number);

    for (let d = 0; d < 80; d++) {
        let newfish = fish.reduce((c, f) => c + (f === 0 ? 1 : 0), 0);
        fish = fish.map(f => f === 0 ? 6 : f - 1);
        fish.push(...new Array(newfish).fill(8));

        console.log(fish.length);
    }
};

await main();
