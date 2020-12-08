package vm

import (
	"fmt"
)

// Reset the Vm execution state
func (vm *Vm) Reset() {
	vm.Ip = 0
	vm.Ac = 0
}

// Exec the Vm
func (vm *Vm) Exec() (bool, error) {
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
