package main

import (
	"bufio"
	"fmt"
	"os"
)

type Fxyz = map[int]map[int]map[int]bool
type Fyz = map[int]map[int]bool
type Fz = map[int]bool

func input(name string) Fxyz {
	fd, err := os.Open(name)
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	d := make(Fxyz)

	y := 0
	for s.Scan() {
		for z, c := range s.Text() {
			v := false
			if (c == '#') {
				v = true
			}
			set(d, 0, y, z, v)
		}
		y++
	}

	return d
}

func get(d Fxyz, x, y, z int) bool {
	return d[x] != nil && d[x][y] != nil && d[x][y][z]
}

func set(d Fxyz, x, y, z int, v bool) {
	if d[x] == nil {
		d[x] = make(Fyz)
	}
	if d[x][y] == nil {
		d[x][y] = make(Fz)
	}
	d[x][y][z] = v
}

func neig(d Fxyz, x, y, z int) int {
	o := 0
	for _, dx := range []int{-1, 0, 1} {
		for _, dy := range []int{-1, 0, 1} {
			for _, dz := range []int{-1, 0, 1} {
				if (dx != 0 || dy != 0 || dz != 0) && get(d, x + dx, y + dy, z + dz) {
					o++
				}
			}
		}
	}
	return o
}

func copy_field(d Fxyz) Fxyz {
	o := make(Fxyz)
	for x := range d {
		o[x] = make(Fyz)
		for y := range d[x] {
			o[x][y] = make(Fz)
			for z := range d[x][y] {
				o[x][y][z] = d[x][y][z]
			}
		}
	}
	return o
}

// func range_x(d Fxyz) (xmin, xmax int) {
// 	for x := range d {
// 		if x < xmin {
// 			xmin = x
// 		}
// 		if x > xmax {
// 			xmax = x
// 		}
// 	}
// 	return
// }

// func range_y(d Fyz) (ymin, ymax int) {
// 	for y := range d {
// 		if y < ymin {
// 			ymin = y
// 		}
// 		if y > ymax {
// 			ymax = y
// 		}
// 	}
// 	return
// }

// func range_z(d Fz) (zmin, zmax int) {
// 	for z := range d {
// 		if z < zmin {
// 			zmin = z
// 		}
// 		if z > zmax {
// 			zmax = z
// 		}
// 	}
// 	return
// }

func range_field(d Fxyz) (xmin, xmax, ymin, ymax, zmin, zmax int) {
	for x := range d {
		if x < xmin {
			xmin = x
		}
		if x > xmax {
			xmax = x
		}

		for y := range d[x] {
			if y < ymin {
				ymin = y
			}
			if y > ymax {
				ymax = y
			}

			for z := range d[x][y] {
				if z < zmin {
					zmin = z
				}
				if z > zmax {
					zmax = z
				}
			}
		}
	}
	return
}

func print_field (d Fxyz) {
	xmin, xmax, ymin, ymax, zmin, zmax := range_field(d)

	fmt.Println("-----")
	for x := xmin; x <= xmax; x++ {
		fmt.Printf("x=%d\n", x)
		for y := ymin; y <= ymax; y++ {
			for z := zmin; z <= zmax; z++ {
				c := '.'
				if (get(d, x, y, z)) {
					c = '#'
				}
				fmt.Printf("%c ", c)
			}
			fmt.Println()
		}
		fmt.Println()
	}
}

func count_field(d Fxyz) int {
	o := 0
	for x := range d {
		for y := range d[x] {
			for z := range d[x][y] {
				if (get(d, x, y, z)) {
					o++
				}
			}
		}
	}
	return o
}

func simplify_field(d Fxyz) {
	for x := range d {
		ya := 0
		for y := range d[x] {
			za := 0
			for z := range d[x][y] {
				if (get(d, x, y, z)) {
					za++
				}
			}
			if za == 0 {
				delete(d[x], y)
			} else {
				ya++
			}
		}
		if ya == 0 {
			delete(d, x)
		}
	}
}

func main() {
	//d := input("../samplea")
	d := input("../input")

	//print_field(d)

	for i := 0; i < 6; i++ {
		old := copy_field(d)
		xmin, xmax, ymin, ymax, zmin, zmax := range_field(d)

		for x := xmin - 1; x <= xmax + 1; x++ {
			for y := ymin - 1; y <= ymax + 1; y++ {
				for z := zmin - 1; z <= zmax + 1; z++ {
					n := neig(old, x, y, z)
	
					if (get(old, x, y, z) && (n < 2 || n > 3)) {
						set(d, x, y, z, false)
					} else if (!get(old, x, y, z) && n == 3) {
						set(d, x, y, z, true)
					}
				}
			}
		}
		simplify_field(d)

		// fmt.Printf("\n==========\ni = %d\n\n", i)
		// print_field(d)
		//fmt.Println(count_field(d))
	}

	fmt.Println(count_field(d))
}
