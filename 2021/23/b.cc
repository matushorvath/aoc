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

void print(const vector<vector<char>>& d) {
    for (auto&& line : d) {
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

map<vector<tuple<char, int, int>>, int> visited;
vector<vector<char>> d;
vector<tuple<char, int, int>> config;

bool isdone(const vector<tuple<char, int, int>>& config) {
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

int step(int score) {
    // if (s > smn) return Infinity;

    // print(d);
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

    for (auto& item : config) {
        char object = get<0>(item);
        int i = get<1>(item);
        int j = get<2>(item);

        int rjo = roomj(object);
        if (i == 1) { // in hall
            if (every(j, rjo, [&](int n) { return j == n || d[i][n] == '.'; }) &&
                d[2][rjo] == '.' &&
                every(3, mxi, [&](int n) { return d[n][rjo] == '.' || d[n][rjo] == object; })) { // can move to own room

                // try move to own room
                int imx = findidx(mxi, 2, [&](int n) { return d[n][rjo] == '.'; });

                d[imx][rjo] = object;
                d[i][j] = '.';

                auto tmpItem = make_tuple(object, imx, rjo);
                swap(item, tmpItem);

                smn = min(smn, step(score + cost(object) * (imx - i + abs(rjo - j))));

                d[i][j] = object;
                d[imx][rjo] = '.';

                swap(tmpItem, item);
            }
        } else { // in room
            if (j != rjo || // not in own room; or
                (i != mxi && // not on bottom
                !every(i+1, mxi, [&](int n) { return d[n][j] == '.' || d[n][j] == object; }))) { // with different ap below

                if (every(1, i-1, [&](int n) { return d[n][j] == '.'; }) &&
                    (d[1][j+1] == '.' || d[1][j-1] == '.')) { // can move out

                    // try move out
                    int jmn = findidx(j-1, 0, [&](int n) { return d[1][n] != '.'; }) + 1;
                    int jmx = findidx(j+1, 12, [&](int n) { return d[1][n] != '.'; }) - 1;
                    for (int k = jmn; k <= jmx; k++) {
                        if (k != j) {
                            d[1][k] = object;
                            d[i][j] = '.';

                            auto tmpItem = make_tuple(object, 1, k);
                            swap(item, tmpItem);

                            smn = min(smn, step(score + cost(object) * (i - 1 + abs(j - k))));

                            d[i][j] = object;
                            d[1][k] = '.';

                            swap(tmpItem, item);
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

    string line;
    while (getline(in, line)) {
        d.emplace_back(line.begin(), line.end());
    }

    for (int i = 0; i < d.size(); i++) {
        for (int j = 0; j < d[i].size(); j++) {
            if (d[i][j] >= 'A' && d[i][j] <= 'D') {
                config.emplace_back(d[i][j], i, j);
            }
        }
    }

    // print(d);
    // print(config);

    int score = step(0);
    cout << score << endl;
};
