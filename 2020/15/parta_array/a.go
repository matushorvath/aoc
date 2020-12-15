package main

import (
	"fmt"
)

func main() {
	turns := 30000000
	input := []int{0, 20, 7, 16, 1, 18, 15}
	nums := make([]int, turns + len(input) + 1)
	turn := 1

	for _, i := range input {
		nums[i] = turn
		turn++
	}

	last := input[len(input) - 1];

	for turn <= turns {
		lastturn := nums[last];
		nums[last] = turn - 1;

		if lastturn == 0 {
			last = 0;
		} else {
			last = turn - lastturn - 1;
		}

		turn++
	}
	fmt.Println(turn, last)
}
