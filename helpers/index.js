import { open } from "node:fs/promises";
import { readFileSync } from "node:fs";

export async function inputIterator(callback) {
  const file = await open("input.txt");
  for await (const line of file.readLines()) {
    callback(line);
  }
}

export function splitInputByLine() {
  return readFileSync("./input.txt", "utf-8").split("\n");
}

export function splitNamedInputByLine(filename) {
  return readFileSync(filename, "utf-8").split("\n");
}

export function splitInputByLineWithGrid() {
  return readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map((line) => [...line]);
}

export function splitLineBySpace(line) {
  return line.split(" ").filter((item) => item !== "");
}

export function splitLineBySpaceAsNum(line) {
  return line
    .split(" ")
    .filter((item) => item !== "")
    .map((item) => parseInt(item));
}

export function removeSpaces(line) {
  return line.replace(/\s/g, "");
}

//REDUCERS

export function reduceProduct(arr) {
  return arr.reduce((acc, curr) => acc * curr, 1);
}

// GRID STUFF; move to separate file
export function generateAdjacentIndeces(x, y) {
  return [
    [x, y + 1], // Down
    [x + 1, y + 1], // Down right
    [x - 1, y + 1], // Down left
    [x, y - 1], // Up
    [x + 1, y - 1], // Up right
    [x - 1, y - 1], // Up left
    [x + 1, y], // Right
    [x - 1, y], // Left
  ];
}

export const symbolRegex = new RegExp(/([^a-zA-Z0-9\.])+/);

export const numberRegex = new RegExp(/([0-9])+/);
