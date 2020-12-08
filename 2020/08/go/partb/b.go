package main

import (
	"aoc08/vm"
)

func main() {
    v := vm.CreateNew()
    err := v.LoadFromFile("../sample")
    //err := v.LoadFromFile("../input")
    if err != nil {
        panic(err)
    }

    //v.Dump()

    for pos, in := range v.Pg {
        if (in.Op != 'j') {
            continue
        }
        v.Reset()
        old := v.UpdateProg(pos, []vm.Inst{{ Op: 'n', Ar: in.Ar }})
        //v.Dump()

        halted, err := v.Exec()
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
