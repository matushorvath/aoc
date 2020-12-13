package main

import (
	"bufio"
	"fmt"
	"os"
)

func print(f [][]byte) {
	for _, r := range f {
		for _, c := range r {
			fmt.Printf("%c", c)
		}
		fmt.Println()
	}
}

func same(a [][]byte, b [][]byte) bool {
	for r := range a {
		for c := range a[r] {
			if a[r][c] != b[r][c] {
				return false
			}
		}
	}
	return true
}

func occu(a [][]byte) int {
	n := 0
	for r := range a {
		for c := range a[r] {
			if a[r][c] == '#' {
				n++
			}
		}
	}
	return n
}

func copy(i [][]byte) [][]byte {
	o := make([][]byte, len(i))
	for r := range i {
		o[r] = make([]byte, len(i[r]))
		for c := range i[r] {
			o[r][c] = i[r][c]
		}
	}
	return o
}

func seat(f [][]byte, r int, c int, vr int, vc int) int {
	r, c = r + vr, c + vc

	for r >= 0 && r < len(f) && c >= 0 && c < len(f[0]) {
		if (f[r][c] == 'L') {
			return 0
		} else if (f[r][c] == '#') {
			return 1
		}
		r, c = r + vr, c + vc
	}
	return 0
}

func neig(f [][]byte, r int, c int) int {
	return seat(f, r, c, -1, 0) +
		seat(f, r, c, 1, 0) +
		seat(f, r, c, 0, -1) +
		seat(f, r, c, 0, 1) +
		seat(f, r, c, -1, -1) +
		seat(f, r, c, 1, 1) +
		seat(f, r, c, -1, 1) +
		seat(f, r, c, 1, -1)
}

func main() {
	//fd, err := os.Open("../sample")
	fd, err := os.Open("../input")
	//fd, err := os.Open("../sb")
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	f := make([][]byte, 0, 100)

	for r := 0; s.Scan(); r++ {
		f = append(f, make([]byte, 0, 100))
		for c := 0; c < len(s.Text()); c++ {
			ch := s.Text()[c]
			f[r] = append(f[r], ch);
		}
	}

	//fmt.Println(neig(f, 3, 3))
	//return;
	print(f)

	var oldf [][]byte

	for len(oldf) == 0 || !same(oldf, f) {
		oldf = copy(f)

		for r := range oldf {
			for c := range oldf[r] {
				if (oldf[r][c] != '.') {
					o := neig(oldf, r, c)
					if (o == 0) {
						f[r][c] = '#'
					} else if (o >= 5) {
						f[r][c] = 'L'
					}
				}
			}
		}

		fmt.Println("----------")
		print(f)
	}

	fmt.Println(occu(f))
}
