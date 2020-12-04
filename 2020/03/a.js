const fs = require('fs');

const data = fs.readFileSync('input', 'utf8').trim().split('\n')
	.map(l => l.split(''));


let c = 0;

let x = 0;
for (let y = 0; y < data.length; y++) {
	if (data[y][x % data[0].length] === '#') c++;
	x += 1;
}

let z = c

c = 0;
x = 0;
for (let y = 0; y < data.length; y++) {
	if (data[y][x % data[0].length] === '#') c++;
	x += 3;
}
z *= c;

c = 0;
x = 0;
for (let y = 0; y < data.length; y++) {
	if (data[y][x % data[0].length] === '#') c++;
	x += 5;
}
z *= c;

c = 0;
x = 0;
for (let y = 0; y < data.length; y++) {
	if (data[y][x % data[0].length] === '#') c++;
	x += 7;
}
z *= c;

c = 0;
x = 0;
for (let y = 0; y < data.length; y+=2)
 {	if (data[y][x % data[0].length] === '#') c++;
	x += 1;
}

z *= c;

console.log(z)
