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

std::tuple<std::vector<std::tuple<int, int, uint32_t, int>>, int> init(std::vector<std::vector<char>>& field) {
	std::vector<std::tuple<int, int, uint32_t, int>> positions;
	int keyCount = 0;

	for (size_t i = 0; i < field.size(); ++i) {
		for (size_t j = 0; j < field[i].size(); ++j) {
			if (field[i][j] == '@') {
				positions.emplace_back(i - 1, j - 1, 0, 0);
				positions.emplace_back(i - 1, j + 1, 0, 1);
				positions.emplace_back(i + 1, j - 1, 0, 2);
				positions.emplace_back(i + 1, j + 1, 0, 3);

				field[i][j] = field[i - 1][j] = field[i + 1][j] = field[i][j - 1] = field[i][j + 1] = '#';
				field[i - 1][j - 1] = field[i - 1][j + 1] = field[i + 1][j - 1] = field[i + 1][j + 1] = '.';
			} else if (field[i][j] >= 'a' && field[i][j] <= 'z') {
				keyCount++;
			}
		}
	}
	return { positions, keyCount };
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
	auto field = load("sample3_8");
	//auto field = load("sample4_24");
	// auto field = load("sample5_32");
	// auto field = load("sample6_72");
	// auto field = load("../input");
	// print(field);

	auto [positions, keyCount] = init(field);
	uint32_t allKeys = (1 << keyCount) - 1;

	print(field);
	// std::cout << std::get<0>(positions[0]) << ',' << std::get<1>(positions[0]) << ',' << std::get<2>(positions[0]) << std::endl;
	// std::cout << std::get<0>(positions[1]) << ',' << std::get<1>(positions[1]) << ',' << std::get<2>(positions[1]) << std::endl;
	// std::cout << std::get<0>(positions[2]) << ',' << std::get<1>(positions[2]) << ',' << std::get<2>(positions[2]) << std::endl;
	// std::cout << std::get<0>(positions[3]) << ',' << std::get<1>(positions[3]) << ',' << std::get<2>(positions[3]) << std::endl;
	// std::cout << keyCount << ' ' << allKeys << std::endl;

	std::set<std::tuple<int, int, uint32_t, int>> border{ positions.begin(), positions.end() };
	std::set<std::tuple<int, int, uint32_t, int>> visited{ positions.begin(), positions.end() };

	int steps = 0;

	while (border.size() > 0) {
		steps++;

		std::cout << "========" << std::endl;
		std::cout << "Step: " << steps << std::endl;

		std::set<std::tuple<int, int, uint32_t, int>> newBorder;
		for (auto&& [x, y, k, r] : border) {
			std::initializer_list<std::tuple<int, int>> nbors = {
				{ x - 1, y }, { x + 1, y }, { x, y - 1 }, { x, y + 1 }
			};

			for (auto&& [nx, ny] : nbors) {
				bool isKey = field[nx][ny] >= 'a' && field[nx][ny] <= 'z';
				bool isDoor = field[nx][ny] >= 'A' && field[nx][ny] <= 'Z';

				if (field[nx][ny] == '.' || isKey || (isDoor && haveDoorKey(k, field[nx][ny]))) {
					uint32_t nk = isKey ? addKey(k, field[nx][ny]) : k;
					if (nk == allKeys) {
						std::cout << "Result: " << steps << std::endl;
						return 0;
					}
					if (visited.count({ nx, ny, nk, r }) == 0) {
						newBorder.emplace(nx, ny, nk, r);
					}
				}
				if (isDoor && !haveDoorKey(k, field[nx][ny])) {
					newBorder.emplace(x, y, k, r);
				}
				if (isKey) {
					for (auto&& [ax, ay, ak, ar] : border) {
						uint32_t newAk = addKey(ak, field[nx][ny]);
						if (ar != r && visited.count({ ax, ay, newAk, ar }) == 0) {
							newBorder.emplace(ax, ay, newAk, ar);
						}
					}
				}
			}
		}

		// TODO remove from border where same position with more keys exists

		swap(border, newBorder);
		visited.insert(border.begin(), border.end());

		for (auto&& [x, y, k, r] : border) {
			std::cout << "B " << x << "," << y << "," << k << "," << r << std::endl;
		}
		// for (auto&& [x, y, k, r] : visited) {
		// 	std::cout << "V " << x << "," << y << "," << k << "," << r << std::endl;
		// }
	}
}
