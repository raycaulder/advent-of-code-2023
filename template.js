import { open } from "node:fs/promises";

async function main() {
  const file = await open("input.txt");
  for await (const line of file.readLines()) {
    console.log(line);
  }
}

async function main2() {
  for await (const line of file.readLines()) {
    console.log(line);
  }
}

main();
main2();
