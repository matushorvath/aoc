package main

import (
	"fmt"
)

func main() {
	input := []int{0, 20, 7, 16, 1, 18, 15}
	nums := make(map[int]int)
	turn := 1

	for _, i := range input {
		nums[i] = turn
		turn++
	}

	last := input[len(input) - 1];

	for turn <= 30000000 {
		lastturn, have := nums[last];
		nums[last] = turn - 1;

		if !have {
			last = 0;
		} else {
			last = turn - lastturn - 1;
		}

		if (turn % 100000 == 0) {
			fmt.Println(turn)
		}
		turn++
	}
	fmt.Println(turn, last)
}
