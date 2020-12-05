package main

import (
	"bufio"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	fd, err := os.Open("input")
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	replacer := strings.NewReplacer("F", "0", "L", "0", "B", "1", "R", "1")
	var max int64 = -1

	for s.Scan() {
		bin := replacer.Replace(s.Text())
		num, err := strconv.ParseInt(bin, 2, 32)
		if err != nil {
			panic(err)
		}

		if num > max {
			max = num
		}
	}
	log.Print(max)
}
