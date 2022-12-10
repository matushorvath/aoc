import re

def main():
    with open("example") as f:
        #d = [l.split() for l in f]
        d = [re.match(r"(.) (\d+)", l).groups() for l in f]
        d = list(map(lambda c: (c[0], int(c[1])), d))
    print(d)

if __name__ == '__main__':
   main()
