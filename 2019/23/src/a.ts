import { promises as fs } from 'fs';
import { Vm } from './vm-a';

type Queue = [bigint, bigint][];
const data: { vm: Vm, q: Queue }[] = [];

async function* getIns(id: number, iq: Queue) {
    yield BigInt(id);
    while (true) {
        if (iq.length === 0) {
            //console.log('in', id, -1);
            yield BigInt(-1);
        } else {
            const [x, y] = iq.shift();
            //console.log('in', id, [x, y]);
            yield x;
            yield y;
        }
    }
}

const runOne = async (vm: Vm, iq: Queue) => {
    let outs: bigint[] = [];
    for await (const out of vm.run(getIns(vm.id, iq))) {
        outs.push(out);
        if (outs.length === 3) {
            //console.log('out', vm.id, outs);
            const [abi, x, y] = outs;
            const a = Number(abi);

            if (a === 255) {
                console.log('255', [x, y]);
            } else {
                outs = [];
                data[a].q.push([x, y]);
            }
        }
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };

    for (let i = 0; i < 50; i += 1) {
        data.push({
            vm: new Vm(i, { ...mem }),
            q: []
        });
    }

    await Promise.all(data.map(d => runOne(d.vm, d.q)));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
