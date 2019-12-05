import { promises as fs } from 'fs';

interface State {
    ip: number;
    mem: number[];
    indata: number[];
    outdata: number[];
};

const param = (s: State, i: number, ops: number[], ms: number[]) => {
    if (ms[i] === 0) { // position mode
        return s.mem[ops[i]];
    } else if (ms[i] === 1) { // immediate mode
        return ops[i];
    } else {
        throw new Error('mode error');
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    //const input = '3,0,4,0,99';

    const s: State = {
        ip: 0,
        mem: input.split(',').map(s => Number(s)),
        indata: [5],
        outdata: []
    };

    while (true) {
        const [ocm, ...ops] = s.mem.slice(s.ip, s.ip + 4)
        const oc = ocm % 100;
        const ms = [100, 1000, 10000].map(x => Math.trunc(ocm / x) % 10);

        console.log('op', { ip: s.ip, oc, ops, ms });

        switch (oc) {
            case 1: // add
                s.mem[ops[2]] = param(s, 0, ops, ms) + param(s, 1, ops, ms);
                s.ip += 4;
                break;
            case 2: // mul
                s.mem[ops[2]] = param(s, 0, ops, ms) * param(s, 1, ops, ms);
                s.ip += 4;
                break;
            case 3: // in
                s.mem[ops[0]] = s.indata.shift();
                s.ip += 2;
                break;
            case 4: // out
                const v = param(s, 0, ops, ms);
                console.log('out', v);
                s.outdata.push(v);
                s.ip += 2;
                break;
            case 5: // jnz
                if (param(s, 0, ops, ms) !== 0) {
                    s.ip = param(s, 1, ops, ms)
                } else {
                    s.ip += 3;
                }
                break;
            case 6: // jz
                if (param(s, 0, ops, ms) === 0) {
                    s.ip = param(s, 1, ops, ms)
                } else {
                    s.ip += 3;
                }
                break;
            case 7: // lt
                s.mem[ops[2]] = param(s, 0, ops, ms) < param(s, 1, ops, ms) ? 1 : 0;
                s.ip += 4;
                break;
            case 8: // eq
                s.mem[ops[2]] = param(s, 0, ops, ms) === param(s, 1, ops, ms) ? 1 : 0;
                s.ip += 4;
                break;
            case 99: // hlt
                console.log('all outs', s.outdata);
                return;
            default:
                throw new Error('opcode error');
        }
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
