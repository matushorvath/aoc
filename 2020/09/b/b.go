package main

import (
	"bufio"
	"log"
	"os"
	"strconv"
)

func main() {
	//fd, err := os.Open("../sample"); tgt := 127
	fd, err := os.Open("../input"); tgt := 556543474
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	nums := make([]int, 0, 10000)
	last := 0

	for s.Scan() {
		num, err := strconv.Atoi(s.Text())
		if err != nil {
			panic(err)
		}
		nums = append(nums, num)

		min := 1355417096825811
		max := 0

		sum := 0
		for i := len(nums) - 1; i >= last; i-- {
			sum += nums[i]

			if (nums[i] > max) {
				max = nums[i]
			}
			if (nums[i] < min) {
				min = nums[i]
			}

			if (sum == tgt) {
				log.Printf("%d %d: %d", min, max, min + max)
				//log.Printf("%d %d", nums[last], nums[len(nums) - 1])
				//log.Printf("%d %d", last, len(nums) - 1)
				return
			}
			if (sum > tgt) {
				last = i + 1
				break
			}
		}
	}
}
