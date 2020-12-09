package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	//fd, err := os.Open("../sample"); prelength := 5
	fd, err := os.Open("../input"); prelength := 25
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	nums := make([]int, prelength)
	last := 0

	for i := 0; i < len(nums); i++ {
		ok := s.Scan()
		if (!ok) {
			panic(fmt.Errorf("unexpected end of file"))
		}

		nums[i], err = strconv.Atoi(s.Text())
		if err != nil {
			panic(err)
		}
	}

	for s.Scan() {
		num, err := strconv.Atoi(s.Text())
		if err != nil {
			panic(err)
		}

		have := make(map[int]bool)
		for _, i := range nums {
			have[i] = true
		}

		ok := false
		for _, i := range nums {
			if (i < num && have[num - i]) {
				ok = true
				log.Printf("%d = %d + %d\n", num, i, num - 1)
				continue
			}
		}

		if !ok {
			log.Printf("res: %d\n", num)
			break
		}

		nums[last] = num
		last = (last + 1) % len(nums)
	}
}
