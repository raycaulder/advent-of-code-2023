import { fileLoader } from "../helpers/index.js";

async function part1() {
  fileLoader((line) => {
    console.log(line);
  }).then(() => {
    // Post Processing
  });
}

async function part2() {
  fileLoader((line) => {
    console.log(line);
  }).then(() => {
    // Post Processing
  });
}

part1();
part2();
