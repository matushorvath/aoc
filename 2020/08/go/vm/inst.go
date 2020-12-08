package vm

import "fmt"

// Inst is one instruction in the program
type Inst struct {
	Op byte
	Ar int
}

func OpToString(op byte) (string, error) {
	switch op {
	case 'a': return "acc", nil;
	case 'j': return "jmp", nil;
	case 'n': return "nop", nil;
	default: return "", fmt.Errorf("vm: invalid instruction op code %c", op)
	}
}

func (inst Inst) String() string {
	ops, err := OpToString(inst.Op)
	if err != nil {
		return "<invalid>"
	}

	sgn := '+'
	arg := inst.Ar
	if (inst.Ar < 0) {
		sgn = '-'
		arg = -inst.Ar
	}

	return fmt.Sprintf("%s %c%d", ops, sgn, arg)
}
