console.log(
eval(
'(NaN' +
require('fs')
    .readFileSync('input', 'utf8')
    .trimEnd()
    .split(/\r?\n/)
    .map(n => `< ${n}) + (${n}`)
    .join('')
+ '< NaN)'
)
);
