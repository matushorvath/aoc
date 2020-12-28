#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>
#include <iterator>
#include <tuple>
#include <cstdint>
#include <set>

std::vector<std::vector<char>> load(const std::string& filename) {
	std::vector<std::vector<char>> out;

	std::ifstream stream;
	stream.open(filename);

	std::string line;
	while (stream >> line) {
		out.emplace_back(line.begin(), line.end());
	}

	stream.close();
	return out;
}

std::tuple<int, int, int> init(std::vector<std::vector<char>>& field) {
	int x = 0;
	int y = 0;
	int keyCount = 0;

	for (size_t i = 0; i < field.size(); ++i) {
		for (size_t j = 0; j < field[i].size(); ++j) {
			if (field[i][j] == '@') {
				x = i;
				y = j;
				field[i][j] = '.';
			} else if (field[i][j] >= 'a' && field[i][j] <= 'z') {
				keyCount++;
			}
		}
	}
	return { x, y, keyCount };
}

void print(const std::vector<std::vector<char>>& field) {
	std::ostreambuf_iterator<char> itr(std::cout);
	for (auto&& line : field) {
		std::copy(line.begin(), line.end(), itr);
		std::cout << std::endl;
	}
}

uint32_t addKey(uint32_t keys, char key) {
	return keys | (1 << (key - 'a'));
}

bool haveDoorKey(uint32_t keys, char door) {
	return (keys & (1 << (door - 'A'))) != 0;
}

int main() {
	//auto field = load("sample1_8");
	//auto field = load("sample2_86");
	auto field = load("../input");
	print(field);

	auto [x, y, keyCount] = init(field);
	uint32_t allKeys = (1 << keyCount) - 1;
	std::cout << x << ' ' << y << ' ' << keyCount << ' ' << allKeys << std::endl;

	std::set<std::tuple<int, int, uint32_t>> border{{ x, y, 0 }};
	std::set<std::tuple<int, int, uint32_t>> visited{{ x, y, 0 }};

	int steps = 0;

	while(border.size() > 0) {
		steps++;
		std::cout << "Step: " << steps << std::endl;

		std::set<std::tuple<int, int, uint32_t>> newBorder;
		for (auto&& [x, y, k] : border) {
			std::initializer_list<std::tuple<int, int>> nbors = {
				{ x - 1, y }, { x + 1, y }, { x, y - 1 }, { x, y + 1 }
			};

			for (auto&& [nx, ny] : nbors) {
				bool isKey = field[nx][ny] >= 'a' && field[nx][ny] <= 'z';
				bool isDoor = field[nx][ny] >= 'A' && field[nx][ny] <= 'Z';

				if (field[nx][ny] == '.' || isKey || (isDoor && haveDoorKey(k, field[nx][ny]))) {
					uint32_t nk = isKey ? addKey(k, field[nx][ny]) : k;
					if (visited.count({ nx, ny, nk }) == 0) {
						if (nk == allKeys) {
							std::cout << "Result: " << steps << std::endl;
							return 0;
						}
						newBorder.insert({ nx, ny, nk });
					}
				}
			}
		}

		swap(border, newBorder);
		visited.insert(border.begin(), border.end());
	}
}
