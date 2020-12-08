package vm

import (
	"fmt"
	"log"
)

// Vm is a virtual machine instance
type Vm struct {
	Pg []Inst
	Ac int
	Ip int
}

// CreateNew creates a new Vm instance
func CreateNew() *Vm {
	return new(Vm)
}

// Dump Vm contents to the log
func (vm *Vm) Dump() {
	log.Printf("%v\n", vm)
}

func (vm Vm) String() string {
	pg := ""
	for ip, in := range vm.Pg {
		pg += fmt.Sprintf("%d: %v\n", ip, in)
	}
	return fmt.Sprintf("%vac %d, ip %d", pg, vm.Ac, vm.Ip)
}

// UpdateProg writes to program memory
func (vm *Vm) UpdateProg(index int, new []Inst) []Inst {
	old := make([]Inst, len(new))
	for i := 0; i < len(new); i++ {
		old[i], vm.Pg[index + i] = vm.Pg[index + i], new[i]
	}
	return old
}
