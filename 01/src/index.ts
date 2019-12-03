import { promises as fs } from 'fs';

const main = async () => {
    const lines = (await fs.readFile('/mnt/c/_/input.txt', 'utf8')).trimRight().split(/\r?\n/);

    let total = 0;
    for (const line of lines) {
        let mass = Number(line);
        console.log(1, mass);

        while (true) {
            const fuel = Math.trunc(mass / 3) - 2
            if (fuel <= 0) break;
            total += fuel;
            mass = fuel;
            console.log(2, fuel);
            console.log(3, total);
        }
    }

    console.log(3, total);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
