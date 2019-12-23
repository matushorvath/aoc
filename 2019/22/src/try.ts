const mul = 7;
const add = 1;
const tot = 19;
//const cnt = 11;

const main = async () => {
    //const start = 42 % tot;
    //let a = start;

    const start = Array.from({ length: tot }).map((_, i) => i);
    const a = [...start];

    for (let i = 0; i < tot; i += 1) {
        console.log(a);
        for (let j = 0; j < tot; j += 1) {
            a[j] = (mul * a[j] + add) % tot;

            if (a[j] === start[j]) {
                console.log('per', j, i + 1);
            }
        }
    }
    console.log(a);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
