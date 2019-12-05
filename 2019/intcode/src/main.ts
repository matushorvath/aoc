import { promises as fs } from 'fs';
import { Vm } from './vm';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const mem = input.split(',').map(s => Number(s));

    new Vm(mem).run(1);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
