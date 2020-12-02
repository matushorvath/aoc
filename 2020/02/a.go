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
		mins, maxs, ch, pwd := m[1], m[2], m[3], m[4]
		min, _ := strconv.Atoi(mins)
		max, _ := strconv.Atoi(maxs)
		cnt := strings.Count(pwd, ch)
		if (cnt >= min && cnt <= max) {
			valid++
		}
	}

	log.Print(valid)
}
