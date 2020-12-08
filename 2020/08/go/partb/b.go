package main

import (
	"aoc08/vm"
)

func main() {
    v := vm.CreateNew()
    //err := v.LoadFromFile("/home/horvathm/aoc/2020/08/sample")
    err := v.LoadFromFile("../input")
    if err != nil {
        panic(err)
    }

    //v.Dump()

    for pos, in := range v.Pg {
        if (in.Op != 'j') {
            continue
        }
        v.Reset()
        old := v.UpdateProg(pos, []vm.In{{ Op: 'n', Ar: in.Ar }})
        //v.Dump()

        halted, err := v.Run()
        if err != nil {
            //v.Dump()
            panic(err)
        }
        //log.Printf("halted: %v", halted)
        if (halted) {
            break
        }

        v.UpdateProg(pos, old)
        //v.Dump()
    }

    v.Dump()
}
