#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <map>
#include <set>
#include <limits>
#include <functional>

using namespace std;

const int mxi = 3;

int cost(char object) {
    switch (object) {
        case 'A': return 1;
        case 'B': return 10;
        case 'C': return 100;
        case 'D': return 1000;
    }
    throw logic_error("cost unknown");
}

inline int roomj(char object) {
    switch (object) {
        case 'A': return 3;
        case 'B': return 5;
        case 'C': return 7;
        case 'D': return 9;
    }
    throw logic_error("roomj unknown");
};

void print(const vector<vector<char>>& data) {
    for (auto&& line : data) {
        for (auto&& chr : line) {
            cout << chr;
        }
        cout << endl;
    }
}

void print(const set<tuple<char, int, int>>& config) {
    for (auto&& [object, i, j] : config) {
        cout << object << "[" << i << "," << j << "]" << endl;
    }
}

map<set<tuple<char, int, int>>, int> visited;

bool isdone(const set<tuple<char, int, int>>& config) {
    // cout << "------" << endl;
    for (auto&& [object, i, j] : config) {
        if (i < 2 || j != roomj(object)) return false;
    }
    return true;
};

bool every(int a, int b, function<bool(int)> fn) {
    int f = min(a, b);
    int t = max(a, b);
    for (int n = f; n <= t; n++) {
        if (!fn(n)) return false;
    }
    return true;
}

int findidx(int f, int t, function<bool(int)> fn) {
    int inc = f < t ? 1 : -1;
    for (int n = f; n != t + inc; n += inc) {
        if (fn(n)) return n;
    }
    throw logic_error("failed to find");
}

int step(vector<vector<char>>& data, const set<tuple<char, int, int>>& config, int score) {
    // if (s > smn) return Infinity;

    // print(data);
    // print(config);

    auto itr = visited.find(config);
    if (itr != visited.end() && itr->second < score) {
        return visited[config];
    }

    if (isdone(config)) {
        visited.emplace(config, score);
        return score;
    }

    int smn = numeric_limits<int>::max();

    for (auto&& item : config) {
        char object = get<0>(item);
        int i = get<1>(item);
        int j = get<2>(item);

        int rjo = roomj(object);
        if (i == 1) { // in hall
            if (every(j, rjo, [&](int n) { return j == n || data[i][n] == '.'; }) &&
                data[2][rjo] == '.' &&
                every(3, mxi, [&](int n) { return data[n][rjo] == '.' || data[n][rjo] == object; })) { // can move to own room

                // try move to own room
                int imx = findidx(mxi, 2, [&](int n) { return data[n][rjo] == '.'; });
                data[imx][rjo] = object;
                data[i][j] = '.';
                auto newConfig = config;
                newConfig.erase(make_tuple(object, i, j));
                newConfig.emplace(object, imx, rjo);
                smn = min(smn, step(data, newConfig, score + cost(object) * (imx - i + abs(rjo - j))));
                data[i][j] = object;
                data[imx][rjo] = '.';
            }
        } else { // in room
            if (j != rjo || // not in own room; or
                (i != mxi && // not on bottom
                !every(i+1, mxi, [&](int n) { return data[n][j] == '.' || data[n][j] == object; }))) { // with different ap below

                if (every(1, i-1, [&](int n) { return data[n][j] == '.'; }) &&
                    (data[1][j+1] == '.' || data[1][j-1] == '.')) { // can move out

                    // try move out
                    int jmn = findidx(j-1, 0, [&](int n) { return data[1][n] != '.'; }) + 1;
                    int jmx = findidx(j+1, 12, [&](int n) { return data[1][n] != '.'; }) - 1;
                    for (int k = jmn; k <= jmx; k++) {
                        if (k != j) {
                            data[1][k] = object;
                            data[i][j] = '.';
                            auto newConfig = config;
                            newConfig.erase(make_tuple(object, i, j));
                            newConfig.emplace(object, 1, k);
                            smn = min(smn, step(data, newConfig, score + cost(object) * (i - 1 + abs(j - k))));
                            data[i][j] = object;
                            data[1][k] = '.';
                        }
                    }
                }
            }
        }
    }

    visited.emplace(config, smn);
    return smn;
};

int main() {
    ifstream in("inputa.ex");

    vector<vector<char>> data;

    string line;
    while (getline(in, line)) {
        data.emplace_back(line.begin(), line.end());
    }

    set<tuple<char, int, int>> config;
    for (int i = 0; i < data.size(); i++) {
        for (int j = 0; j < data[i].size(); j++) {
            if (data[i][j] >= 'A' && data[i][j] <= 'D') {
                config.emplace(data[i][j], i, j);
            }
        }
    }

    // print(data);
    // print(config);

    int score = step(data, config, 0);
    cout << score << endl;
};
