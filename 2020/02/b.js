const fs = require('fs');

console.log(fs.readFileSync('input', 'utf8').trim().split('\n')
	.map(l => l.split(/(\d+)-(\d+) (.): (.+)/))
	.map(l => [parseInt(l[1]), parseInt(l[2]), l[3], l[4]])
	.reduce((p, [p1, p2, ch, pwd]) => {
		const ok =
			(pwd[p1 - 1] === ch && pwd[p2 - 1] !== ch) ||
			(pwd[p1 - 1] !== ch && pwd[p2 - 1] === ch);
		return p + (ok ? 1 : 0);
}, 0));
