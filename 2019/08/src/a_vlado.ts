import { promises as fs } from 'fs';

const main = async () => {
    let input = await fs.readFile('input', 'utf8');

    console.log(input
        .match(/.{1,150}/g)
        .map(item => ({
            cnt0: (item.match(/0/g) || []).length,
            sum: (item.match(/1/g) || []).length * (item.match(/2/g) || []).length
        }))
        .sort((a,b) => a.cnt0 - b.cnt0)
        [0]
    );
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
