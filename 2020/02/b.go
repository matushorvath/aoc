package main

import (
	"io/ioutil"
	"log"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	f, err := ioutil.ReadFile("input")
	if err != nil {
		log.Fatalf("%v\n", err)
	}
	data := strings.Split(strings.TrimSpace(string(f)), "\n")

	// 1-3 b: cdefg
	re := regexp.MustCompile(`(\d+)-(\d+) (.): (.+)`)

	valid := 0

	for _, line := range data {
		m := re.FindStringSubmatch(line)
		p1s,p2s, ch, pwd := m[1], m[2], m[3][0], m[4]
		p1, _ := strconv.Atoi(p1s)
		p2, _ := strconv.Atoi(p2s)
		if ((pwd[p1 - 1] == ch && pwd[p2 - 1] != ch) ||
			(pwd[p1 - 1] != ch && pwd[p2 - 1] == ch)) {
			valid++
		}
	}

	log.Print(valid)
}
