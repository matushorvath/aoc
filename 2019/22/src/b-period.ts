const bcu = require('bigint-crypto-utils');

const main = async () => {
    // const tot = BigInt(119315717514047);
    // const cnt = 1101741582076661;

    // const mul = BigInt(45024166448568);
    // const add = BigInt(97815358304278);

    // const pos = BigInt(2020);

    const tot = BigInt(10);
    const cnt = BigInt(3);

    const mul = BigInt(7);
    const add = BigInt(7);

    const pos = BigInt(7);

    const mul2: bigint = bcu.modPow(mul, cnt, tot);
    const add2 = BigInt(9);//add * (BigInt(1) - mul2 + tot) % tot * bcu.modInv(BigInt(1) - mul + tot, tot) % tot;

    console.log('mul add', mul2, add2);

    const res = (pos - add2 + tot) % tot * bcu.modInv(mul2, tot) % tot;
    console.log('res', res);

    console.log((res * mul2 + add2) % tot);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
