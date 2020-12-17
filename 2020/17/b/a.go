package main

import (
	"bufio"
	"fmt"
	"os"
)

type Fxyzw = map[int]map[int]map[int]map[int]bool
type Fyzw = map[int]map[int]map[int]bool
type Fzw = map[int]map[int]bool
type Fw = map[int]bool

func input(name string) Fxyzw {
	fd, err := os.Open(name)
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	d := make(Fxyzw)

	y := 0
	for s.Scan() {
		for z, c := range s.Text() {
			v := false
			if (c == '#') {
				v = true
			}
			set(d, 0, 0, y, z, v)
		}
		y++
	}

	return d
}

func get(d Fxyzw, x, y, z, w int) bool {
	return d[x] != nil && d[x][y] != nil && d[x][y][z] != nil && d[x][y][z][w]
}

func set(d Fxyzw, x, y, z, w int, v bool) {
	if d[x] == nil {
		d[x] = make(Fyzw)
	}
	if d[x][y] == nil {
		d[x][y] = make(Fzw)
	}
	if d[x][y][z] == nil {
		d[x][y][z] = make(Fw)
	}
	d[x][y][z][w] = v
}

func neig(d Fxyzw, x, y, z, w int) int {
	o := 0
	for _, dx := range []int{-1, 0, 1} {
		for _, dy := range []int{-1, 0, 1} {
			for _, dz := range []int{-1, 0, 1} {
				for _, dw := range []int{-1, 0, 1} {
					if (dx != 0 || dy != 0 || dz != 0 || dw != 0) && get(d, x + dx, y + dy, z + dz, w + dw) {
						o++
					}
				}
			}
		}
	}
	return o
}

func copy_field(d Fxyzw) Fxyzw {
	o := make(Fxyzw)
	for x := range d {
		o[x] = make(Fyzw)
		for y := range d[x] {
			o[x][y] = make(Fzw)
			for z := range d[x][y] {
				o[x][y][z] = make(Fw)
				for w := range d[x][y][z] {
					o[x][y][z][w] = d[x][y][z][w]
				}
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

func range_field(d Fxyzw) (xmin, xmax, ymin, ymax, zmin, zmax, wmin, wmax int) {
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

				for w := range d[x][y][z] {
					if w < wmin {
						wmin = w
					}
					if w > wmax {
						wmax = w
					}
				}
			}
		}
	}
	return
}

func print_field (d Fxyzw) {
	xmin, xmax, ymin, ymax, zmin, zmax, wmin, wmax := range_field(d)

	fmt.Println("-----")
	for x := xmin; x <= xmax; x++ {
		for y := ymin; y <= ymax; y++ {
			fmt.Printf("x=%d\n", x)
			for z := zmin; z <= zmax; z++ {
				for w := wmin; w <= wmax; w++ {
					c := '.'
					if (get(d, x, y, z, w)) {
						c = '#'
					}
					fmt.Printf("%c ", c)
				}
				fmt.Println()
			}
			fmt.Println()
		}
	}
}

func count_field(d Fxyzw) int {
	o := 0
	for x := range d {
		for y := range d[x] {
			for z := range d[x][y] {
				for w := range d[x][y][z] {
					if (get(d, x, y, z, w)) {
						o++
					}
				}
			}
		}
	}
	return o
}

func simplify_field(d Fxyzw) {
	for x := range d {
		ya := 0
		for y := range d[x] {
			za := 0
			for z := range d[x][y] {
				wa := 0
				for w := range d[x][y][z] {
					if (get(d, x, y, z, w)) {
						wa++
					}
				}
				if wa == 0 {
					delete(d[x][y], z)
				} else {
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
		xmin, xmax, ymin, ymax, zmin, zmax, wmin, wmax := range_field(d)

		for x := xmin - 1; x <= xmax + 1; x++ {
			for y := ymin - 1; y <= ymax + 1; y++ {
				for z := zmin - 1; z <= zmax + 1; z++ {
					for w := wmin - 1; w <= wmax + 1; w++ {
						n := neig(old, x, y, z, w)
		
						if (get(old, x, y, z, w) && (n < 2 || n > 3)) {
							set(d, x, y, z, w, false)
						} else if (!get(old, x, y, z, w) && n == 3) {
							set(d, x, y, z, w, true)
						}
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
