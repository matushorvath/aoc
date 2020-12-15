#include <stdio.h>

#define TURNS 30000000

const int input[] = { 0, 20, 7, 16, 1, 18, 15 };
const int inputLen = sizeof(input) / sizeof(input[0]);

int nums[TURNS + sizeof(input) / sizeof(input[0]) + 1] = {};

int main() {
	int turn = 1;

	int last;
	for (int i = 0; i < inputLen; ++i) {
		last = input[i];
		nums[last] = turn;

		turn++;
	}

	while (turn <= TURNS) {
		int lastturn = nums[last];
		nums[last] = turn - 1;

		if (lastturn == 0) {
			last = 0;
		} else {
			last = turn - lastturn - 1;
		}

		turn++;
	}

	printf("%d %d\n", turn, last);
}
