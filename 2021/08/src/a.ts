import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/).map(l => l.trim().split('|').map(s => s.trim().split(' ')));

    const out = data.flatMap(([digits, outputs]) => outputs
        .filter(output => (output.length >= 2 && output.length <= 4) || output.length === 7));

    console.log(out.length);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
