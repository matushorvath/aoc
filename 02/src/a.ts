import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input.txt', 'utf8');
    //const input = '1,9,10,3,2,3,11,0,99,30,40,50';
    //const input = '1,0,0,0,99';
    //const input = '2,3,0,3,99';
    //const input = '2,4,4,5,99,0';
    //const input = '1,1,1,4,99,5,6,0,99';
    const data = input.split(',').map(s => Number(s));
    data[1] = 12;
    data[2] = 2;

    let ip = 0;
    while (true) {
        const [oc, op1, op2, res] = data.slice(ip, ip + 4)
        console.log('o', { ip, oc, op1, op2, res });

        switch (oc) {
            case 1:
                data[res] = data[op1] + data[op2];
                ip += 4;
                break;
            case 2:
                data[res] = data[op1] * data[op2];
                ip += 4;
                break;
            case 99:
                console.log('data[0]', data[0]);
                return;
            default:
                throw new Error('opcode error');
        }

        console.log('d', data);
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
