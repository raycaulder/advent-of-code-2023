import { open } from "node:fs/promises";

async function part1() {
  const file = await open("input.txt");
  let sum = 0;
  for await (const line of file.readLines()) {
    const num = numFromString(line);
    sum += num;
  }

  //Answer
  console.log(sum);
}

async function part2() {
  const file = await open("input.txt");
  let sum = 0;

  for await (const line of file.readLines()) {
    console.log("--------------");
    console.log(line);
    const stringedLine = replaceStringWithNumbers(line);
    console.log(numFromString(stringedLine));
    sum += numFromString(stringedLine);
  }

  //Answer
  console.log(sum);
}

function replaceStringWithNumbers(string) {
  const digits = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const changes = [];

  let editableString = string.slice(0);

  digits.forEach((digit) => {
    const digitIndex = editableString.indexOf(digit);
    const lastDigitIndex = editableString.lastIndexOf(digit);

    if (digitIndex !== -1) {
      if (digitIndex === lastDigitIndex) {
        changes.push([digit, digitIndex]);
      } else {
        changes.push([digit, digitIndex]);
        changes.push([digit, lastDigitIndex]);
      }
    }
  });

  changes.sort((a, b) => a[1] - b[1]);

  console.log(changes);

  if (changes.length) {
    //Replace first
    string = string.replace(changes[0][0], digits.indexOf(changes[0][0]) + 1);
    //Replace last

    var regex = new RegExp("(" + changes[changes.length - 1][0] + ")(?!.*\\1)");
    console.log(regex);
    string = string.replace(
      regex,
      digits.indexOf(changes[changes.length - 1][0]) + 1
    );
  }
  return string;
}

function numFromString(string) {
  const numbers = string.replace(/[^\d]/g, "");
  return parseInt(numbers[0] + numbers[numbers.length - 1]);
}

// part1();
part2();
