#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>
// #include <iterator>
#include <tuple>
// #include <cstdint>
#include <set>
#include <map>
// #include <bitset>

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

void print_routes(const std::map<std::tuple<char, char>, int>& routes) {
	std::cout << "==========" << std::endl;
	for (auto&& [k, v] : routes) {
		auto&& [f, t] = k;
		std::cout << f << " -> " << t << " = " << v << std::endl;
	}
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

auto find_nodes(const std::vector<std::vector<char>>& field) {
	std::map<char, std::tuple<int, int>> nodes;

	for (size_t i = 0; i < field.size(); ++i) {
		for (size_t j = 0; j < field[i].size(); ++j) {
			if (field[i][j] != '.' && field[i][j] != '#') {
				nodes[field[i][j]] = { i, j };
			}
		}
	}

	return nodes;
}

auto find_routes_from(
		const std::vector<std::vector<char>>& field,
		char fid, int fx, int fy) {

	std::map<std::tuple<char, char>, int> routes;

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

					bool isDoor = field[nx][ny] >= 'A' && field[nx][ny] <= 'Z';
					if (!isDoor) {
						nextitr.emplace(nx, ny);
					}

					if (field[nx][ny] != '.') {
						routes[{ fid, field[nx][ny] }] = distance;
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

	std::map<std::tuple<char, char>, int> routes;

	for (auto&& [id, pos] : nodes) {
		auto&& [x, y] = pos;
		routes.merge(find_routes_from(field, id, x, y));
	}

	return routes;
}

int main() {
	// auto field = load("sample3_8");
	// auto field = load("sample4_24");
	// auto field = load("sample5_32");
	// auto field = load("sample6_72");
	auto field = load("../input");

	auto nodes = update_part_2(field);
	print_field(field);
	print_nodes(nodes);

	nodes.merge(find_nodes(field));
	print_nodes(nodes);

	auto routes = find_routes(field, nodes);
	print_routes(routes);
}
