const data = require('fs').readFileSync('input', 'utf8').trim().split('\n\n')
    .map(g => g.split('\n').map(p => p.split(''))
        .reduce((p, c) => {
            c.forEach(a => p[a] = (p[a] || 0) + 1);
            p[''] = (p[''] || 0) + 1;
            return p;
        }, {})
    )
    // .map(x => Object.values(x))
    // .map(c => {
    //     var max = 0
    //     var count = 0
    //     for (var a of Object.values(c)) {
    //         if (a > max) {
    //             count = 0;
    //             max = a;
    //         }
    //         if (a === max) {
    //             count++;
    //         }
    //     }
    //     return count;
    // })
    .reduce((p, c) => p + (() => {
        var max = c['']
        var count = 0
        for (var a of Object.values(c)) {
            if (a === max) {
                count++;
            }
        }
        return count - 1;
    })(), 0)

    // .reduce((p, c) => p + 
    //     Object.values(c).reduce((p, c) => p > c ? p : c, 0)
    // , 0);

console.log(JSON.stringify(data));
