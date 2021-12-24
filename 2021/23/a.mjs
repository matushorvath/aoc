'use strict';

import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/);



    console.log(data);
};

await main();

/*

#############
#...........#
###B#C#A#D###
  #B#C#D#A#
  #########

  D2
  A3
  D3
  A6
  D5
    C5 C5
    B5 B5
    A3 A8

A20


  D2
  A10
  D3
  A6
  D5
    C5 C5
    B5 B5
    A3 A3


D10
C10
B10
A22

10000
 1000
  100
   20

high 11122
11120
*/