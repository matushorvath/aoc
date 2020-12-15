#include <iostream>
#include <vector>

int main() {
	constexpr int TURNS = 30000000;
	std::vector<int> input = { 0, 20, 7, 16, 1, 18, 15 };
	std::vector<int> nums(TURNS + input.size() + 1);
	int turn = 1;

	for (auto&& i : input) {
		nums[i] = turn;
		turn++;
	}

	int last = input.back();

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

	std::cout << turn << ' ' << last << std::endl;
}
