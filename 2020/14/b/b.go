package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	//fd, err := os.Open("../sample_b")
	fd, err := os.Open("../input")
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	var mask string
	mem := make(map[uint64]uint64)

	for s.Scan() {
		if strings.HasPrefix(s.Text(), "mask") {
			mask = s.Text()[7:]
		} else {
			var a, v uint64
			_, err = fmt.Sscanf(s.Text(), "mem[%d] = %d", &a, &v)
			if err != nil {
				panic(err)
			}

			as := make([]uint64, 0, 256)
			as = append(as, a)

			fmt.Printf("%s %b\n", mask, a)

			for i, c := range mask {
				switch c {
					case '1':
						for j := range as {
							as[j] = as[j] | (1 << (35-i))
						}
					case 'X': {
						nas := make([]uint64, 0, 256)
						for j := range as {
							as[j] = as[j] | (1 << (35-i))
							nas = append(nas, as[j] & ^(1 << (35-i)))
						}
						as = append(as, nas...)
					}
				}
			}

			for _, x := range as {
				mem[x] = v
				//fmt.Printf("%b(%d) ", as[j], as[j])
			}
			//fmt.Println()
		}
	}

	var n uint64 = 0
	for _, v := range mem {
		n += v
	}

	fmt.Println(n)
}
