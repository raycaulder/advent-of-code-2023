import { open } from "node:fs/promises";

export async function inputIterator(callback) {
  const file = await open("input.txt");
  for await (const line of file.readLines()) {
    callback(line);
  }
}

