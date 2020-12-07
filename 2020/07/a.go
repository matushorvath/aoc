package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	fd, err := os.Open("input")
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	re1 := regexp.MustCompile(`(\w+ \w+) bags contain (.*)`)
	re2 := regexp.MustCompile(`no other bags|(\d+) (\w+ \w+) bags?(?:, |.)`)

	for s.Scan() {
		m1 := re1.FindStringSubmatch(s.Text())
		if m1 == nil {
			panic("no match 1")
		}
		m2 := re2.FindAllStringSubmatch(m1[2], -1)
		if m2 == nil {
			panic("no match 2")
		}

		fmt.Printf("%s\n", m1[1])
		for _, b := range m2 {
			if b[1] == "" {
				continue
			}
			n, err := strconv.Atoi(b[1])
			if err != nil {
				panic(err)
			}

			fmt.Printf("  %s: %d\n", b[2], n)
		}
	}
}
