package vm

import (
	"fmt"
	"io/ioutil"
	"strings"
)

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
	vm.Pg = make([]Inst, len(data))

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

		vm.Pg[ip] = Inst{ Op: ops[0], Ar: ar }
		ip++
	}

	vm.Pg = vm.Pg[:ip]

	vm.Reset()
	return nil
}
