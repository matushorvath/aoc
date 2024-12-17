import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));
//console.log(data);

let startr, startc;

find: for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
        if (data[r][c] === '^') {
            startr = r;
            startc = c;
            break find;
        }
    }
}

//console.log(pr, pc);

let obstacles = 0;

for (let or = 0; or < data.length; or++) {
    for (let oc = 0; oc < data[0].length; oc++) {
        if ((or === startr && oc === startc) || data[or][oc] === '#') {
            continue;
        }
        data[or][oc] = '#';

        const visited = [];
        for (let r = 0; r < data.length; r++) visited[r] = [];

        let pr = startr, pc = startc;
        let dr = -1, dc = 0;

        while (true) {
            const nr = pr + dr;
            const nc = pc + dc;

            //console.log(pr, pc, dr, dc);

            if (nr < 0 || nr >= data.length || nc < 0 || nc >= data[0].length) {
                break;
            }

            if (data[nr][nc] === '#') {
                if (visited[nr][nc]?.[dr]?.[dc]) {
                    console.log(or, oc);
                    obstacles++;
                    break;
                }

                if (visited[nr][nc] === undefined) visited[nr][nc] = [];
                if (visited[nr][nc][dr] === undefined) visited[nr][nc][dr] = [];
                visited[nr][nc][dr][dc] = true;

                [dr, dc] = [dc, -dr + 0];
            } else {
                pr = nr;
                pc = nc
            }
        }

        data[or][oc] = '.';

        //console.log(data.map(r => r.join('')).join('\n'));
    }
}

console.log('result', obstacles);
