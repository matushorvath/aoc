#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>
#include <tuple>
#include <cstdint>
#include <set>
#include <map>
#include <bitset>
#include <queue>

const char* HIGHLIGHT = "\033[1;31m";
const char* DEFAULT = "\033[0m";

void print_field(
		const std::vector<std::vector<char>>& field,
		const std::set<std::tuple<int, int>>& robots = {}) {

	std::cout << "==========" << std::endl;
	for (size_t i = 0; i < field.size(); ++i) {
		for (size_t j = 0; j < field[i].size(); ++j) {
			bool hl = robots.count({ i, j }) > 0;
			std::cout << (hl ? HIGHLIGHT : "") << field[i][j] << (hl ? DEFAULT : "");
		}
		std::cout << std::endl;
	}
}

void print_nodes(const std::map<char, std::tuple<int, int>>& nodes) {
	std::cout << "==========" << std::endl;
	for (auto&& [k, v] : nodes) {
		auto&& [x, y] = v;
		std::cout << k << " = [" << x << ", " << y << "]" << std::endl;
	}
}

void print_routes(const std::map<std::tuple<char, char, uint32_t>, std::tuple<int, uint32_t>>& routes) {
	std::cout << "==========" << std::endl;
	for (auto&& [k, v] : routes) {
		auto&& [f, t, ki] = k;
		auto&& [d, ko] = v;

		std::cout << "[" << std::bitset<26>(ki) << " " << ki << "] ";
		std::cout << f << " -> " << t << " = " << d;
		std::cout << " [" << std::bitset<26>(ko) << " " << ko << "]";
		std::cout << std::endl;
	}
}

void dump_dot(
		const std::string& filename,
		const std::map<std::tuple<char, char, uint32_t>, std::tuple<int, uint32_t>>& routes) {

	std::ofstream stream;
	stream.open(filename);

	stream << "graph G {" << std::endl;

	for (auto&& [k, v] : routes) {
		auto&& [f, t, ki] = k;
		auto&& [d, ko] = v;

		bool isKey = f >= 'a' &&f <= 'z';
		bool isDoor = f >= 'A' && f <= 'Z';

		std::string shape{ isDoor ? "box" : isKey ? "circle" : "doublecircle" };
		stream << "\t" << f << " [ shape = \"" << shape << "\"];" << std::endl;

		if (f < t) {
			stream << "\t" << f << " -- " << t << " [ label = \"" << d << "\"];" << std::endl;
		}
	}

	stream << "}" << std::endl;

	stream.close();
}

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

auto update_part_2(std::vector<std::vector<char>>& field) {
	std::map<char, std::tuple<int, int>> nodes;

	for (size_t i = 0; i < field.size(); ++i) {
		for (size_t j = 0; j < field[i].size(); ++j) {
			if (field[i][j] == '@') {
				field[i][j] = field[i - 1][j] = field[i + 1][j] = field[i][j - 1] = field[i][j + 1] = '#';
				field[i - 1][j - 1] = field[i - 1][j + 1] = field[i + 1][j - 1] = field[i + 1][j + 1] = '.';

				nodes['0'] = { i - 1, j - 1 };
				nodes['1'] = { i - 1, j + 1 };
				nodes['2'] = { i + 1, j - 1 };
				nodes['3'] = { i + 1, j + 1 };
			}
		}
	}

	return nodes;
}

auto find_nodes(const std::vector<std::vector<char>>& field) ->
		std::tuple<std::map<char, std::tuple<int, int>>, int> {

	std::map<char, std::tuple<int, int>> nodes;

	int keyCount = 0;

	for (size_t i = 0; i < field.size(); ++i) {
		for (size_t j = 0; j < field[i].size(); ++j) {
			if (field[i][j] != '.' && field[i][j] != '#') {
				nodes[field[i][j]] = { i, j };
			}
			if (field[i][j] >= 'a' && field[i][j] <= 'z') {
				keyCount++;
			}
		}
	}

	return { nodes, keyCount };
}

auto find_routes_from(
		const std::vector<std::vector<char>>& field,
		char fid, int fx, int fy) {

	std::map<std::tuple<char, char, uint32_t>, std::tuple<int, uint32_t>> routes;

	std::set<std::tuple<int, int>> borders{ { fx, fy } };
	std::set<std::tuple<int, int>> visited{ { fx, fy } };

	int distance = 0;

	while (borders.size() > 0) {
		distance++;

		std::set<std::tuple<int, int>> nextitr;

		for (auto&& [cx, cy] : borders) {
			std::initializer_list<std::tuple<int, int>> nbors = {
				{ cx - 1, cy }, { cx + 1, cy }, { cx, cy - 1 }, { cx, cy + 1 }
			};

			for (auto&& [nx, ny] : nbors) {
				if (field[nx][ny] != '#' && visited.count({ nx, ny }) == 0) {
					visited.emplace(nx, ny);

					bool isKey = field[nx][ny] >= 'a' && field[nx][ny] <= 'z';
					bool isDoor = field[nx][ny] >= 'A' && field[nx][ny] <= 'Z';

					if (field[nx][ny] == '.') {
						nextitr.emplace(nx, ny);
					}

					if (isKey) {
						uint32_t ko = 1 << (field[nx][ny] - 'a');
						routes[{ fid, field[nx][ny], 0 }] = { distance, ko };
					} else if (isDoor) {
						uint32_t ki = 1 << (field[nx][ny] - 'A');
						routes[{ fid, field[nx][ny], ki }] = { distance, 0 };
					} else if (field[nx][ny] != '.') {
						routes[{ fid, field[nx][ny], 0 }] = { distance, 0 };
					}
				}
			}
		}

		swap(borders, nextitr);
	}

	return routes;
}

auto find_routes(
		const std::vector<std::vector<char>>& field,
		const std::map<char, std::tuple<int, int>>& nodes) {

	std::map<std::tuple<char, char, uint32_t>, std::tuple<int, uint32_t>> routes;

	for (auto&& [id, pos] : nodes) {
		auto&& [x, y] = pos;
		routes.merge(find_routes_from(field, id, x, y));
	}

	return routes;
}

inline bool is_subset(uint32_t a, uint32_t b) {
	return ((a ^ b) & a) == 0;
}

uint32_t bitcount(uint32_t u) {
	uint32_t count = u - ((u >> 1) & 033333333333) - ((u >> 2) & 011111111111);
	return ((count + (count >> 3)) & 030707070707) % 63;
}

int find_keys(
			const std::map<std::tuple<char, char, uint32_t>, std::tuple<int, uint32_t>>& routes,
			int keyCount) {

	uint32_t allKeys = (1 << keyCount) - 1;

	std::queue<std::tuple<char, char, char, char, uint32_t, int, std::set<char>>> queue;
	queue.emplace('0', '1', '2', '3', 0, 0, std::set<char>());

	int maxKeyCount = 0;

	while (queue.size() > 0) {
		auto&& [a, b, c, d, k, di, seen] = queue.front();
		queue.pop();

		std::cout << a << ',' << b << ',' << c << ',' << d << ',' << k << ' ' << di << std::endl;

		if (k == allKeys) {
			return di;
		}

		int kbc = bitcount(k);
		if (kbc > maxKeyCount) {
			maxKeyCount = kbc;
			std::cout << "KBC: " << kbc << "/" << keyCount << std::endl;
		}

		for (auto&& [rk, rv] : routes) {
			auto&& [f, t, ki] = rk;
			auto&& [dd, ko] = rv;

			if (seen.count(t) == 0) {
				if (f == a && is_subset(ki, k)) {
					std::set<char> nseen = seen; nseen.insert(f);
					queue.emplace(t, b, c, d, k | ko, di + dd, nseen);
				} else if (f == b && is_subset(ki, k)) {
					std::set<char> nseen = seen; nseen.insert(f);
					queue.emplace(a, t, c, d, k | ko, di + dd, nseen);
				} else if (f == c && is_subset(ki, k)) {
					std::set<char> nseen = seen; nseen.insert(f);
					queue.emplace(a, b, t, d, k | ko, di + dd, nseen);
				} else if (f == d && is_subset(ki, k)) {
					std::set<char> nseen = seen; nseen.insert(f);
					queue.emplace(a, b, c, t, k | ko, di + dd, nseen);
				}
			}
		}
	}

	return -1;
}

int main() {
	//auto field = load("sample3_8");
	// auto field = load("sample4_24");
	// auto field = load("sample5_32");
	// auto field = load("sample6_72");
	auto field = load("../input");

	auto starts = update_part_2(field);
	print_field(field);
//	print_nodes(starts);

	auto [nodes, keyCount] = find_nodes(field);
	nodes.merge(starts);
//	print_nodes(nodes);
//	std::cout << keyCount << std::endl;

	auto routes = find_routes(field, nodes);
//	print_routes(routes);
	dump_dot("graph.dot", routes);

//	int dist = find_keys(routes, keyCount);
//	std::cout << "Result: " << dist << std::endl;
}
