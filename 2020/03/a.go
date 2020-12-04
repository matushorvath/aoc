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
