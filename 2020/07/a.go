package mainx

import (
	"bufio"
	"fmt"
	"os"
	"regexp"

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

	d := make(map[string]map[string]bool);

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
			// n, err := strconv.Atoi(b[1])
			// if err != nil {
			// 	panic(err)
			// }

			if d[b[2]] == nil {
				d[b[2]] = map[string]bool{ m1[1]: true }
			} else {
				d[b[2]][m1[1]] = true
			}
		}
	}

	fmt.Printf("%# v\n", pretty.Formatter(d))

	stack := make([]string, 0, 256)
	stack = append(stack, "shiny gold")
	done := make(map[string]bool)
	done[stack[0]] = true

	for len(stack) > 0 {
		var in string
		in, stack = stack[0], stack[1:]

		for out := range d[in] {
			//d[in][out] = true;
			if _, ok := done[out]; !ok {
				done[out] = true
				stack = append(stack, out)
			}
		}
	}

	fmt.Printf("%# v\n", pretty.Formatter(done))
	//fmt.Printf("%# v\n", pretty.Formatter(d["shiny gold"]))
	fmt.Printf("%d\n", len(done) - 1)
}
