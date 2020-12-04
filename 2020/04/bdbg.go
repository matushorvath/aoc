package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func ishex(c byte) bool {
	return (c >= 'a' && c <= 'f') || (c >= '0' && c <= '9');
}

func isnum(c byte) bool {
	return (c >= '0' && c <= '9');
}

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
	fmt.Print("[[")
	sep := "";

	for s.Scan() {
		if s.Text() == "" {
			if len(missing) == 0 {
				valid++
			}
			missing = map[string]bool{}
			for k, v := range fields {
				missing[k] = v
			}
			fmt.Print("],[")
			sep = "";
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
			res := 0;
			if k == "byr" {
				if n, e := strconv.Atoi(v); e == nil && n >= 1920 && n <= 2002 {
					delete(missing, k); res = 1
				}
			} else if k == "iyr" {
				if n, e := strconv.Atoi(v); e == nil && n >= 2010 && n <= 2020 {
					delete(missing, k); res = 1
				}
			} else if k == "eyr" {
				if n, e := strconv.Atoi(v); e == nil && n >= 2020 && n <= 2030 {
					delete(missing, k); res = 1
				}
			} else if k == "hgt" {
				if v[len(v) - 2:] == "in" {
					if n, e := strconv.Atoi(v[:len(v) - 2]); e == nil && n >= 59 && n <= 76 {
						delete(missing, k); res = 1
					}
				} else if v[len(v) - 2:] == "cm" {
					if n, e := strconv.Atoi(v[:len(v) - 2]); e == nil && n >= 150 && n <= 193 {
						delete(missing, k); res = 1
					}
				}
			} else if k == "hcl" {
				if v[0] == '#' && len(v) == 7 && ishex(v[1]) && ishex(v[2]) && ishex(v[3]) &&
					ishex(v[4]) && ishex(v[5]) && ishex(v[6]) {
					delete(missing, k); res = 1
				}
			} else if k == "ecl" {
				switch v {
				case "amb", "blu", "brn", "gry", "grn", "hzl", "oth":
					delete(missing, k); res = 1
				}
			} else if k == "pid" {
				if len(v) == 9 && isnum(v[0]) && isnum(v[1]) && isnum(v[2]) && isnum(v[3]) &&
					isnum(v[4]) && isnum(v[5]) && isnum(v[6]) && isnum(v[7]) && isnum(v[8]) {
					delete(missing, k); res = 1
				}
			}
			fmt.Print(sep, res)
			sep = ","
		}
	}
	if len(missing) == 0 {
		valid++
	}
	fmt.Print("]]")
	log.Print(valid)
}
