const I = '389125467';
const N = 9;
const T = 100;

// const I = '974618352';
// const N = 1000000;
// const T = 10000000;

const cups = Array(N).fill().reduce((p, _, i) =>
    ({ num: I[N - i - 1] || (N - i), next: p }), undefined);

const [itrs] = Array(N).fill().reduce(([r, c], _, i) => [{ [c.num]: c, ...r }, c.next], [{}, cups]);

// console.log(Array(N).fill().reduce(([r, n]) => [[...r, n.num], n.next], [[], cups])[0].join(', '));
// console.log(itrs);

let citr = cups;

for (let i = 0; i < T; i++) {
    const p0 = citr.next || cups;
    const p1 = p0.next || cups;
    const p2 = p1.next || cups;

    let dest = citr.num - 1 || N;
    while (dest === p0.num || dest === p1.num || dest === p2.num) {
        dest = dest - 1 || N;
    }
    const ditr = itrs[dest];

    citr.next = p2.next;
    p2.next = ditr.next;
    ditr.next = p0;

    citr = citr.next || cups;
}

const out0 = itrs[1];
const out1 = out0.next || cups;

console.log(out0 * out1);
