import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let data = input.trimEnd().split(',').map(Number);

    const fish = {};
    for (let i = 0; i <= 8; i++) fish[i] = 0;

    for (const item of data) {
        fish[item] = fish[item] + 1;
    }

    for (let d = 0; d < 256; d++) {
        let newfish = fish[0];
        for (let i = 0; i < 8; i++) fish[i] = fish[i + 1];
        fish[6] += newfish;
        fish[8] = newfish;

        console.log(Object.values(fish).reduce((p, c) => p + c, 0));
    }
};

await main();
