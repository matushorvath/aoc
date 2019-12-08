import { promises as fs } from 'fs';
import { Vm } from './vm';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const mem = input.split(',').map(s => Number(s));

    //new Vm(0, mem).run([1]);
    console.log(new Vm(0, mem).dasm());
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
