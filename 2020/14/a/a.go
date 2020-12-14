package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	//fd, err := os.Open("../sample")
	fd, err := os.Open("../input")
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	var zmask uint64
	var omask uint64
	mem := make(map[uint64]uint64)

	for s.Scan() {
		if strings.HasPrefix(s.Text(), "mask") {
			zmask, omask = 0b111111111111111111111111111111111111, 0
			for i, c := range s.Text()[7:] {
				if (c == '0') {
					zmask = zmask & ^(1 << (35-i))
				}
				if (c == '1') {
					omask = omask | (1 << (35-i))
				}

				//fmt.Printf("> %d %c : %b %b\n", i, c, zmask, omask)
			}
		} else {
			var a, v uint64
			_, err = fmt.Sscanf(s.Text(), "mem[%d] = %d", &a, &v)
			if err != nil {
				panic(err)
			}
			//fmt.Printf("%d %b %b %b\n", v, v, omask, zmask)
			mem[a] = (v | omask) & zmask
		}

		//fmt.Printf("%v\n", mem)
	}

	var n uint64 = 0
	for _, v := range mem {
		n += v
	}

	fmt.Println(n)
}
