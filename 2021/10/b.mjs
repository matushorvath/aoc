import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const d = input.trimEnd().split(/\r?\n/);

    const pairs = { '(': ')', '[': ']', '{': '}', '<': '>' };
    const pts = { ')': 1, ']': 2, '}': 3, '>': 4 };

    let scores = [];

    for (let li = 0; li < d.length; li++) {
        const l = d[li];
        const st = [];
        let ok = true;
        line: for (let i = 0; i < l.length; i++) {
            switch (l[i]) {
                case '(': 
                case '[': 
                case '{': 
                case '<': 
                    st.push(l[i]);
                    break;
                case ')': 
                case ']': 
                case '}': 
                case '>': 
                {
                    const op = st.pop();
                    if (pairs[op] !== l[i]) {
                        ok = false;
                        break line;
                    }
                }
            }
        }

        console.log(st);

        if (ok) {
        let lscore = 0;
        for (let i = st.length - 1; i >= 0; i--) {
            lscore = lscore * 5 + pts[pairs[st[i]]];
        }
        scores.push(lscore);
    }
    }

    console.log(scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)]);
};

await main();
