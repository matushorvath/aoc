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

func neig(f [][]byte, r int, c int) (int, int) {
	e, o := 0, 0
	if (r > 0) {
		if (f[r - 1][c] == 'L') {
			e++
		} else if (f[r - 1][c] == '#') {
			o++
		}
	}
	if (r < len(f) - 1) {
		if (f[r + 1][c] == 'L') {
			e++
		} else if (f[r + 1][c] == '#') {
			o++
		}
	}

	if (c > 0) {
		if (f[r][c - 1] == 'L') {
			e++
		} else if (f[r][c - 1] == '#') {
			o++
		}
	}
	if (c < len(f[0]) - 1) {
		if (f[r][c + 1] == 'L') {
			e++
		} else if (f[r][c + 1] == '#') {
			o++
		}
	}

	if (r > 0 && c > 0) {
		if (f[r - 1][c - 1] == 'L') {
			e++
		} else if (f[r - 1][c - 1] == '#') {
			o++
		}
	}

	if (r < len(f) - 1 && c < len(f[0]) - 1) {
		if (f[r + 1][c + 1] == 'L') {
			e++
		} else if (f[r + 1][c + 1] == '#') {
			o++
		}
	}

	if (r > 0 && c < len(f[0]) - 1) {
		if (f[r - 1][c + 1] == 'L') {
			e++
		} else if (f[r - 1][c + 1] == '#') {
			o++
		}
	}

	if (r < len(f) - 1 && c > 0) {
		if (f[r + 1][c - 1] == 'L') {
			e++
		} else if (f[r + 1][c - 1] == '#') {
			o++
		}
	}

	return e, o
}

func main() {
	//fd, err := os.Open("../sample")
	fd, err := os.Open("../input")
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

	var oldf [][]byte

	for len(oldf) == 0 || !same(oldf, f) {
		oldf = copy(f)

		for r := range oldf {
			for c := range oldf[r] {
				if (oldf[r][c] != '.') {
					_, o := neig(oldf, r, c)
					if (o == 0) {
						f[r][c] = '#'
					} else if (o >= 4) {
						f[r][c] = 'L'
					}
				}
			}
		}
		print(f)
		fmt.Println("----------")
	}

	fmt.Println(occu(f))
}
