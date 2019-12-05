import { promises as fs } from 'fs';

interface State {
    ip: number;
    mem: number[];
    ins: number[];
    outs: number[];
};

interface Op {
    oc: number;
    ops: number[];
    mds: number[];
};

const getOp = (s: State) => {
    const [ocm, ...ops] = s.mem.slice(s.ip, s.ip + 4)
    const oc = ocm % 100;
    const mds = [100, 1000, 10000].map(x => Math.trunc(ocm / x) % 10);

    //console.log('op', { ip: s.ip, oc, ops, mds });

    return { oc, ops, mds };
};

const getParam = (s: State, o: Op, i: number) => {
    switch (o.mds[i]) {
        case 0: // position mode
            return s.mem[o.ops[i]];
        case 1: // immediate mode
            return o.ops[i];
        default:
            throw new Error(`mode error: s ${JSON.stringify(s)} o ${JSON.stringify(o)} i ${i}`);
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    //const input = '3,0,4,0,99';

    const s: State = {
        ip: 0,
        mem: input.split(',').map(s => Number(s)),
        ins: [1],
        outs: []
    };

    while (true) {
        const o = getOp(s);

        switch (o.oc) {
            case 1: // add
                s.mem[o.ops[2]] = getParam(s, o, 0) + getParam(s, o, 1);
                s.ip += 4;
                break;
            case 2: // mul
                s.mem[o.ops[2]] = getParam(s, o, 0) * getParam(s, o, 1);
                s.ip += 4;
                break;
            case 3: // in
                s.mem[o.ops[0]] = s.ins.shift();
                s.ip += 2;
                break;
            case 4: // out
                const v = getParam(s, o, 0);
                console.log('out', v);
                s.outs.push(v);
                s.ip += 2;
                break;
            case 5: // jnz
                if (getParam(s, o, 0) !== 0) {
                    s.ip = getParam(s, o, 1)
                } else {
                    s.ip += 3;
                }
                break;
            case 6: // jz
                if (getParam(s, o, 0) === 0) {
                    s.ip = getParam(s, o, 1)
                } else {
                    s.ip += 3;
                }
                break;
            case 7: // lt
                s.mem[o.ops[2]] = getParam(s, o, 0) < getParam(s, o, 1) ? 1 : 0;
                s.ip += 4;
                break;
            case 8: // eq
                s.mem[o.ops[2]] = getParam(s, o, 0) === getParam(s, o, 1) ? 1 : 0;
                s.ip += 4;
                break;
            case 99: // hlt
                console.log('all outs', s.outs);
                return;
            default:
                throw new Error(`opcode error: s ${JSON.stringify(s)} o ${JSON.stringify(o)}`);
        }
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
