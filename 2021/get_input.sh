#!/bin/sh

#HEADER="Cookie: session=53616c7465645f5f1396666ccddd47602c80d03a35a754a435c6cbe1cbd9788889c39ea5f6cba8b1de9ed205724f606b"
HEADER="Cookie: session=53616c7465645f5f3e826853b280a841f63dfefecf6f2eeb47bc0427558618d4f998375ed7c3157101209f42f4461ee5"

BASE_DIR="$(cd "$(dirname "$0")"; pwd)"
OUTPUT="$BASE_DIR/$(printf "%02d" $1)/input"

wget --header="$HEADER" --output-document="$OUTPUT" https://adventofcode.com/2021/day/$1/input
