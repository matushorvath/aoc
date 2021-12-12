#!/bin/sh

set -e

XZINTBIT=~/xzintbit
IC=$XZINTBIT/vms/go/ic

# assemble
$IC $XZINTBIT/bin/as.input < b.s > b.o || ( cat b.o ; false )

# link
echo .\$ | cat b.o - | $IC $XZINTBIT/bin/ld.input > b.input || ( cat b.input ; false )

# execute
$IC b.input < input
