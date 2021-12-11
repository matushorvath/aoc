import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const d = input.trimEnd().split(/\r?\n/);

    const pairs = { '(': ')', '[': ']', '{': '}', '<': '>' };
    const pts = { ')': 3, ']': 57, '}': 1197, '>': 25137 };

    let score = 0;

    for (let li = 0; li < d.length; li++) {
        const l = d[li];
        const st = [];
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
                        score += pts[l[i]];
                        console.log(li, score, pts[l[i]]);
                        break line;
                    }
                }
            }
        }
    }

    console.log(score);
};

await main();
