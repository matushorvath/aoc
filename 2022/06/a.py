import re

def main():
    with open("input") as f:
        d = f.readline()

    for i in range(4, len(d)):
        s = set(d[i - 4:i])
        if len(s) == 4:
            print(i)
            break

if __name__ == '__main__':
   main()
