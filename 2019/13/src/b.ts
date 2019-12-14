import { promises as fs, exists } from 'fs';
import { Vm } from './vm-b';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getInput = async () => {
    const answer = await new Promise(resolve => rl.question('Input (> <): ', resolve));

    console.log('answer', answer);
    switch (answer) {
        case '<': return BigInt(-1);
        case '>': return BigInt(1);
        case ' ': return BigInt(0);
    }
};

const field: bigint[][] = [];

const getField = (x: number, y: number) => {
    if (field[x] === undefined) return undefined;
    else return field[x][y];
};

const setField = (x: number, y: number, v: bigint) => {
    if (field[x] === undefined) field[x] = [];
    field[x][y] = v;
};

const draw = (p: bigint) => {
    switch (Number(p)) {
        case 0: return ' ';
        case 1: return 'X';
        case 2: return '#';
        case 3: return '-';
        case 4: return 'O';
    }
};

const logField = () => {
    console.log(getField(-1, 0), '\n');
    console.log(field.reduce((pc, c) => c.map((p, i) => (pc[i] || '') + draw(p)), [] as string[]).join('\n'));
};

async function* getIns() {
    while (true) {
        yield await getInput();
    }
}

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };
    mem['0'] = BigInt(2);
    const vm = new Vm(0, mem);

    let outs: bigint[] = [];
    for await (const out of vm.run(getIns())) {
        outs.push(out);
        if (outs.length === 3) {
            const [x, y, t] = outs;
            outs = [];

            setField(Number(x), Number(y), t);

            if (getField(-1, 0) !== undefined) {
                logField();
            }
        }
    }

    console.log(Object.values(field).reduce(
        (pr, r) => pr + Object.values(r).reduce(
            (pc, c) => pc + (c === BigInt(2) ? 1 : 0), 0), 0));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
