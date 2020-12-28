#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>
#include <iterator>
#include <tuple>
#include <cstdint>
#include <set>
#include <map>
#include <bitset>

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

std::tuple<std::vector<std::tuple<int, int>>, int> init(std::vector<std::vector<char>>& field) {
	std::vector<std::tuple<int, int>> robots;
	int keyCount = 0;

	for (size_t i = 0; i < field.size(); ++i) {
		for (size_t j = 0; j < field[i].size(); ++j) {
			if (field[i][j] == '@') {
				robots.emplace_back(i - 1, j - 1);
				robots.emplace_back(i - 1, j + 1);
				robots.emplace_back(i + 1, j - 1);
				robots.emplace_back(i + 1, j + 1);

				field[i][j] = field[i - 1][j] = field[i + 1][j] = field[i][j - 1] = field[i][j + 1] = '#';
				field[i - 1][j - 1] = field[i - 1][j + 1] = field[i + 1][j - 1] = field[i + 1][j + 1] = '.';
			} else if (field[i][j] >= 'a' && field[i][j] <= 'z') {
				keyCount++;
			}
		}
	}
	return { robots, keyCount };
}

const char* HILT = "\033[1;31m";
const char* DFLT = "\033[0m";

void print(const std::vector<std::vector<char>>& field, const std::vector<std::tuple<int, int>>& robots = {}) {
	std::set<std::tuple<int, int>> rset{ robots.begin(), robots.end() };

	for (size_t i = 0; i < field.size(); ++i) {
		for (size_t j = 0; j < field[i].size(); ++j) {
			bool hl = rset.count({ i, j }) > 0;
			std::cout << (hl ? HILT : "") << field[i][j] << (hl ? DFLT : "");
		}
		std::cout << std::endl;
	}
}

uint32_t addKey(uint32_t keys, char key) {
	return keys | (1 << (key - 'a'));
}

bool haveDoorKey(uint32_t keys, char door) {
	return (keys & (1 << (door - 'A'))) != 0;
}

bool isSubsetOf(uint32_t a, const std::set<uint32_t>& ks) {
	for (auto b : ks) {
		if (((a ^ b) & a) == 0) {
			return true;
		}
	}
	return false;
}

void mergeKey(uint32_t a, std::set<uint32_t>& ks) {
	for (auto itr = ks.begin(); itr != ks.end();) {
		auto& b = *itr;
		if (((a ^ b) & a) == 0) {
			// Superset of a is already in ks
			return;
		}
		if (((a ^ b) & b) == 0) {
			// The a keyset is a superset of b, remove b
			ks.erase(itr++);
			//std::cout << 'E';
		} else {
			++itr;
		}
	}
	ks.insert(a);
}

uint32_t bitcount(uint32_t u) {
    uint32_t count = u - ((u >> 1) & 033333333333) - ((u >> 2) & 011111111111);
    return ((count + (count >> 3)) & 030707070707) % 63;
}

int main() {
	//auto field = load("sample3_8");
	//auto field = load("sample4_24");
	//auto field = load("sample5_32");
	//auto field = load("sample6_72");
	auto field = load("../input");
	// print(field);

	auto [robots, keyCount] = init(field);
	uint32_t allKeys = (1 << keyCount) - 1;

	print(field);
	// std::cout << std::get<0>(positions[0]) << ',' << std::get<1>(positions[0]) << ',' << std::get<2>(positions[0]) << std::endl;
	// std::cout << std::get<0>(positions[1]) << ',' << std::get<1>(positions[1]) << ',' << std::get<2>(positions[1]) << std::endl;
	// std::cout << std::get<0>(positions[2]) << ',' << std::get<1>(positions[2]) << ',' << std::get<2>(positions[2]) << std::endl;
	// std::cout << std::get<0>(positions[3]) << ',' << std::get<1>(positions[3]) << ',' << std::get<2>(positions[3]) << std::endl;
	// std::cout << keyCount << ' ' << allKeys << std::endl;

	std::map<std::vector<std::tuple<int, int>>, std::set<uint32_t>> border{ { robots, { 0 } } };
	std::map<std::vector<std::tuple<int, int>>, std::set<uint32_t>> visited{ { robots, { 0 } } };

	int steps = 0;

	while (border.size() > 0) {
		steps++;

		std::cout << "========" << std::endl;
		std::cout << "Step: " << steps << std::endl;

		std::map<std::vector<std::tuple<int, int>>, std::set<uint32_t>> newBorder;

		uint32_t maxKeys = 0;

		for (auto&& [robots, ks] : border) {
			for (auto&& k : ks) {
				for (size_t ri = 0; ri < robots.size(); ++ri) {
					auto&& [x, y] = robots[ri];

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
							auto nkbc = bitcount(nk);
							if (nkbc > maxKeys) {
								maxKeys = nkbc;
							}

							auto newRobots = robots;
							newRobots[ri] = { nx, ny };

							if (!isSubsetOf(nk, visited[newRobots])) {
								mergeKey(nk, newBorder[newRobots]);
							}
						}
					}
				}
			}
		}

		//std::cout << '-';
		swap(border, newBorder);
		for (auto&& [robots, ks] : border) {
			for (auto&& k : ks) {
				mergeKey(k, visited[robots]);
			}
		}
		std::cout << "MxK: " << maxKeys << "; V: " << visited.size() << "; B: " << border.size() << std::endl;

		// for (auto&& [robots, ks] : border) {
		// 	for (auto&& k : ks) {
		// 		for (auto&& [x, y] : robots) {
		// 			std::cout << '[' << x << "," << y << "] ";
		// 		}
		// 		std::cout << "K " << std::bitset<26>(k) << " (" << k << ")" << std::endl;
		// 		print(field, robots);
		// 	}
		// }
		// for (auto&& [x, y, k, r] : visited) {
		// 	std::cout << "V " << x << "," << y << "," << k << "," << r << std::endl;
		// }
	}
}
