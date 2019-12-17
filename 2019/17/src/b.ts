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
        'A'.repeat(Object.keys(data).length).split('').join(','),
        '0,0,0,0,0,0,0,0,0,0',
        '0',
        '0',
        'y'
    ];
    console.log('inputs', inputs);

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
        'L,2,3,2,3,L,10,R,6,L,10,L,10,R,6,',
        'R,12,L,12,L,12,R,12,L,12,L,12,L,6,L,10'
    ].join('').split(',').map(i => i === 'L' ? -5 : (i === 'R' ? -4 : Number(i)));

    let phase = 1;
    const output: { [phase: number]: number[] } = {};
    for (const chunk of makeChunks(instructions, 10)) {
        output[phase] = chunk;
        for (const inst of chunk) {
            if (inst < 0) phase += 1;
            else phase += inst;
        }
    }
    console.log(output);
    return { data: output, phaseCount: phase };
};
const { data, phaseCount } = makeData();

const fixup = (mem: Mem, phase: number) => {
    console.log('phase', phase);

    const inst = data[phase];
    if (inst) {
        console.log('updating for phase', phase);
        //const m1 = vm.dumpMem();
        for (let i = 0; i < 10; i += 1) {
            mem[`${1194 + i}`] = BigInt(inst[i] || 0);
        }
        // const m2 = vm.dumpMem();
        // console.log(Vm.cmpMem(m1, m2));
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };
    mem['0'] = BigInt(2);
    vm = new Vm(0, mem);

    let line: string[] = [];

    let phase = -1;
    let lastEndl = false;

    for await (const a of vm.run(getIns())) {
        if (a === BigInt(10)) {
            console.log(line.join(''));
            line = [];

            if (lastEndl) {
                // Frame finished
                phase += 1;
                if (phase >= phaseCount) break;
                fixup(mem, phase);
            }
            lastEndl = true;
        } else {
            line.push(String.fromCharCode(Number(a)));
            lastEndl = false;
        }
    }

    console.log('phaseCount', phaseCount);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
