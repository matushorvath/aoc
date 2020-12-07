package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"

	"github.com/kr/pretty"
)

func main() {
	//fd, err := os.Open("sample")
	fd, err := os.Open("input")
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	re1 := regexp.MustCompile(`(\w+ \w+) bags contain (.*)`)
	re2 := regexp.MustCompile(`no other bags|(\d+) (\w+ \w+) bags?(?:, |.)`)

	d := make(map[string]map[string]int);

	for s.Scan() {
		m1 := re1.FindStringSubmatch(s.Text())
		if m1 == nil {
			panic("no match 1")
		}
		m2 := re2.FindAllStringSubmatch(m1[2], -1)
		if m2 == nil {
			panic("no match 2")
		}

		for _, b := range m2 {
			if b[1] == "" {
				continue
			}
			n, err := strconv.Atoi(b[1])
			if err != nil {
				panic(err)
			}

			if d[m1[1]] == nil {
				d[m1[1]] = map[string]int{ b[2]: n }
			} else {
				d[m1[1]][b[2]] = n
			}
		}
	}

	fmt.Printf("%# v\n", pretty.Formatter(d))

	type N struct{ b string; n int }
	stack := make([]N, 0, 256)
	stack = append(stack, N{ b: "shiny gold", n: 1 })

	done := make(map[string]int)
	done[stack[0].b] = 1

	for len(stack) > 0 {
		var in N
		in, stack = stack[0], stack[1:]

		for out, cnt := range d[in.b] {
			done[out] += in.n * cnt
			stack = append(stack, N{ b: out, n: in.n * cnt })
		}
	}

	res := 0
	for _, n := range done {
		res += n
	}

	fmt.Printf("%# v\n", pretty.Formatter(done))
	//fmt.Printf("%# v\n", pretty.Formatter(d["shiny gold"]))
	fmt.Printf("%d\n", res - 1)
}
