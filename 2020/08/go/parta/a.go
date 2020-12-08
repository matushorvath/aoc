package main

import (
	"aoc08/vm"
	"log"
)

func main() {
    v := vm.CreateNew()
    err := v.LoadFromFile("../sample")
    //err := v.LoadFromFile("../input")
    if err != nil {
        panic(err)
    }

    v.Dump()

    halted, err := v.Exec()
    if err != nil {
        panic(err)
    }

    v.Dump()
    log.Printf("halted: %v", halted)
}
