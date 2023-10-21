use std::fs;
use regex::*;

fn main() {
    let line_re = Regex::new(r"^(?P<src>\w+) to (?P<tgt>\w+) = (?P<dst>\d+)$").unwrap();
    let input  = fs::read_to_string("inputa.txt").unwrap();

    for line in input.lines() {
        let edge = line_re.captures(line).unwrap();
        println!("{} - {} - {}", &edge["src"], &edge["tgt"], &edge["dst"]);
    }
}
