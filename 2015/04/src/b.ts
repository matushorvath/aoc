import crypto from 'crypto';

const main = async () => {
    const input = 'ckczppom';

    let value = 1;
    while (true) {
        const hash = crypto.createHash('md5');
        hash.update(input + value);
        if (hash.digest('hex').startsWith('000000')) {
            console.log(value);
            return;
        }
        value = value + 1;
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
