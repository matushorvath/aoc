package vm

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"

	"github.com/kr/pretty"
)

// In is one instruction in the program
type In struct {
	Op byte
	Ar int
}

// Vm is a virtual machine instance
type Vm struct {
	Pg []In
	Ac int
	Ip int
}

// CreateNew creates a new Vm instance
func CreateNew() *Vm {
	return new(Vm)
}

// LoadFromFile loads the Vm program from a file
func (vm *Vm) LoadFromFile(path string) error {
	input, err := ioutil.ReadFile(path)
	if err != nil {
		return err
	}
	return vm.LoadFromString(string(input));
}

// LoadFromString loads the Vm program from a string
func (vm *Vm) LoadFromString(input string) error {
	data := strings.Split(input, "\n")
	vm.Pg = make([]In, len(data))

	ip := 0
	for lno, line := range data {
		// TODO skip comments
		if (strings.TrimSpace(line) == "") {
			continue;
		}

		var ops string
		var ar int
		n, err := fmt.Sscanf(line, "%s %d", &ops, &ar)
		if (n != 2) {
			return fmt.Errorf("vm:%d: line format error: %s", lno, line)
		}
		if err != nil {
			return fmt.Errorf("vm:%d: %v", lno, err)
		}

		if ops != "acc" && ops != "jmp" && ops != "nop" {
			return fmt.Errorf("vm:%d: invalid op code: %s", lno, ops)
		}

		vm.Pg[ip] = In{ Op: ops[0], Ar: ar }
		ip++
	}

	vm.Pg = vm.Pg[:ip]

	vm.Reset()
	return nil
}

// Run the Vm
func (vm *Vm) Run() (bool, error) {
	seen := make(map[int]bool)

	for !seen[vm.Ip] && vm.Ip != len(vm.Pg) {
		seen[vm.Ip] = true;

		in := vm.Pg[vm.Ip];
		switch in.Op {
			case 'n':
				vm.Ip++

			case 'a':
				vm.Ac += in.Ar
				vm.Ip++

			case 'j':
				vm.Ip += in.Ar;

			default:
				return false, fmt.Errorf("vm: invalid opcode %c at %d", in.Op, vm.Ip)
		}
	}

	halted := !seen[vm.Ip]
	return halted, nil
}

// Reset the Vm execution state
func (vm *Vm) Reset() {
	vm.Ip = 0
	vm.Ac = 0
}

// Dump Vm contents to the log
// TODO convert to a Formatter
func (vm *Vm) Dump() {
	log.Printf("%# v\n", pretty.Formatter(vm.Pg))
	log.Printf("ac %d, ip %d\n", vm.Ac, vm.Ip)
}

// UpdateProg writes to program memory
func (vm *Vm) UpdateProg(index int, new []In) []In {
	old := make([]In, len(new))
	for i := 0; i < len(new); i++ {
		old[i], vm.Pg[index + i] = vm.Pg[index + i], new[i]
	}
	return old
}
