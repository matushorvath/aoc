package main

import (
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

func main() {
	f, err := ioutil.ReadFile("input")
	if err != nil {
		log.Fatalf("%v\n", err)
	}
	data := strings.Split(strings.TrimSpace(string(f)), "\n")

	nums := make(map[int]bool)

	for _, item := range data {
		num, err := strconv.Atoi(item)
		if err != nil {
			log.Fatalf("parse error: %v\n", err)
		}
		_, has := nums[num]
		if (!has && num < 2020) {
			nums[num] = true;
		}
	}

	for i := range nums {
		for j := range nums {
			for k := range nums {
				if (i + j + k == 2020) {
					log.Print(i*j*k)
				}
			}
		}
	}
}

/*
package main

import (
  "bufio"
  "fmt"
  "os"
)

func main() {
  fd, err := os.Open("input")
  if err != nil {
    panic(err)
  }
  s := bufio.NewScanner(fd)

  for s.Scan() {
    _, err := fmt.Sscanf(s.Text(), "")
    if err != nil {
      panic(err)
    }
  }
}
*/
