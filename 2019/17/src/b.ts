import { promises as fs, exists } from 'fs';
import { Mem, Vm } from './vm-b';

const field: number[][] = [];

const getField = (x: number, y: number) => {
    if (field[x] === undefined) return undefined;
    else return field[x][y];
};

const setField = (x: number, y: number, v: number) => {
    if (field[x] === undefined) field[x] = [];
    field[x][y] = v;
};

const logField = (field: string[][]) => {
    console.log(field.map(r => r.join('')).join('\n'));
};

let vm: Vm;

async function* getIns() {
    const inputs = [
        'A,A,A',//,A,A,A,A,A,A,A',
        '0,0,0,0,0,0,0,0,0,0',
        '0',
        '0',
        'y'
    ];

    const mems: Mem[] = [];
    mems.push(vm.dumpMem());

    for (const input of inputs) {
        for (const char of input.split('')) {
            yield BigInt(char.charCodeAt(0));
            //mems.push(vm.dumpMem());
            //console.log('char', char, Vm.cmpMem(mems[mems.length - 2], mems[mems.length - 1]));
        }
        yield BigInt('\n'.charCodeAt(0));

        mems.push(vm.dumpMem());
        console.log('endl', Vm.cmpMem(mems[mems.length - 2], mems[mems.length - 1]));
    }
}

const makeChunks = (input: number[], size: number) => {
    const output = [];
    let index = 0;
    while (index < input.length) {
        output.push(input.slice(index, size + index));
        index += size;
    }
    return output;
};

const makeData = () => {
    const instructions = [
        -5, 2, 3, 2, 3,
        -5, 10, -4, 6, -5,
        10, -5, 10, -4, 6
    ];

    let phase = 2;
    const output: { [phase: number]: number[] } = {};
    for (const chunk of makeChunks(instructions, 5)) {
        output[phase] = chunk;
        for (const inst of chunk) {
            if (inst < 0) phase += 1;
            else phase += inst;
        }
    }
    console.log(output);
    return output;
};
const data = makeData();

const fixup = (mem: Mem, phase: number) => {
    console.log('phase', phase);

    const inst = data[phase];
    if (inst) {
        const m1 = vm.dumpMem();
        mem['1194'] = BigInt(inst[0] || 0);
        mem['1195'] = BigInt(inst[1] || 0);
        mem['1196'] = BigInt(inst[2] || 0);
        mem['1197'] = BigInt(inst[3] || 0);
        mem['1198'] = BigInt(inst[4] || 0);
        const m2 = vm.dumpMem();
        console.log(Vm.cmpMem(m1, m2));
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };
    mem['0'] = BigInt(2);
    vm = new Vm(0, mem);

    let line: string[] = [];

    let phase = 0;
    let lastEndl = false;

    for await (const a of vm.run(getIns())) {
        if (a === BigInt(10)) {
            console.log(line.join(''));
            line = [];

            if (lastEndl) {
                // Frame finished
                phase += 1;
                fixup(mem, phase);
            }
            lastEndl = true;
        } else {
            line.push(String.fromCharCode(Number(a)));
            lastEndl = false;
        }
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
