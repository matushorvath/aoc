console.log(
    require('fs').readFileSync('input', 'utf8')
        .trimEnd().split(/\r?\n/)
        .map(l => ({
            op: l.charCodeAt(0) - 'A'.charCodeAt(0),
            me: l.charCodeAt(2) - 'X'.charCodeAt(0)
        }))
        .reduce((sum, { op, me }) => sum + (me + 1) + (me - op + 4) % 3 * 3, 0)
);
