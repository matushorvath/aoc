// const test = (b: number[], p: number) => {
//     const knownJump = p + 3 < 9;
//     if (knownJump && !b[p] && (!b[p + 3] || !test(b, p + 3))) return 0;
//     return 1;
// };

const test = (b: number[], p: number) => {
    if (!b[p]) return 0;
    if (p + 1 >= 9 || test(b, p + 1)) return 1;
    if (p + 4 >= 9 || test(b, p + 4)) return 1;
    return 0;
};

const main = async () => {
    const out: number[] = [];
    for (let i = 0; i < 512; i += 1) {
        const b = [
            i % 2, (i >> 1) % 2, (i >> 2) % 2, (i >> 3) % 2, (i >> 4) % 2,
            (i >> 5) % 2, (i >> 6) % 2, (i >> 7) % 2, (i >> 8) % 2
        ];

        //if (test(b, 3)) out.push(i);
        if ((!b[0] || !b[1] || !b[2]) && test(b, 3)) out.push(i);
    }
    console.log(out.join(','));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
