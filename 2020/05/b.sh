diff <(echo "ibase=2;$(<input tr FLBR 0011 | sort)" | bc) <(seq 0 1024)

echo "ibase=2;$(<input tr FLBR 0011 | sort)" | bc | (while read n; do [ $p != $((n-1)) ] && echo $((n-1)) ; p=$n ; do
ne)
