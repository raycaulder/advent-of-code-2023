import { open } from "node:fs/promises";

async function main() {
  const file = await open("input.txt");

  let sum = 0;
  for await (const line of file.readLines()) {
    console.log(numFromString(line));
  }

  console.log(sum);
}

function numFromString(string) {
  return parseInt(string.replace(/[^\d]/, ""));
}

async function main2() {
  const file = await open("input.txt");
  for await (const line of file.readLines()) {
    console.log(line);
  }
}

main();
// main2();
