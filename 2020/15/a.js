const input = [0,20,7,16,1,18,15];
//const input = [0,3,6];

const nums = {};

let turn = 1;

for (const i of input) {
    nums[i] = turn;
    console.log(turn, i);
    turn++;
}

let last = input[input.length - 1];

while (turn <= 30000000) {
    const lastturn = nums[last];
    nums[last] = turn - 1;

    last = 0;
    if (!lastturn) {
        last = 0;
    } else {
        last = turn - lastturn - 1;
    }

    //console.log(turn, last);
    //console.log(turn, last, nums);
    if (turn % 100000 === 0) console.log(turn);
    turn++;
}
console.log(turn, last);
