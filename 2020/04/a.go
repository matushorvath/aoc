package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	fd, err := os.Open("input")
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	valid := 0

	fields := map[string]bool{
		"byr": true, "iyr": true, "eyr": true, "hgt": true,
		"hcl": true, "ecl": true, "pid": true,
	}
	missing := map[string]bool{}
	for k, v := range fields {
		missing[k] = v
	}

	for s.Scan() {
		if (s.Text() == "") {
			if (len(missing) == 0) {
				valid++
			}
			missing = map[string]bool{}
			for k, v := range fields {
				missing[k] = v
			}
			continue
		}

		w := bufio.NewScanner(strings.NewReader(s.Text()))
		w.Split(bufio.ScanWords)

		for w.Scan() {
			var k, v string
			_, err := fmt.Sscanf(w.Text(), "%3s:%s", &k, &v)
			if err != nil {
				panic(err)
			}
			delete(missing, k)
		}
	}
	if (len(missing) == 0) {
		valid++
	}

	log.Print(valid)
}
