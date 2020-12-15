#include <iostream>
#include <vector>
#include <unordered_map>

int main() {
	std::vector<int> input = { 0, 20, 7, 16, 1, 18, 15 };
	std::unordered_map<int, int> nums;
	int turn = 1;

	for (auto&& i : input) {
		nums[i] = turn;
		turn++;
	}

	int last = input.back();

	while (turn <= 30000000) {
		auto lastturn = nums.find(last);
		nums[last] = turn - 1;

		if (lastturn == nums.end()) {
			last = 0;
		} else {
			last = turn - lastturn->second - 1;
		}

		turn++;
	}
	std::cout << turn << ' ' << last << std::endl;
}
