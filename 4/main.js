import { splitInputByLine } from "../helpers/index.js";

function part1() {
  let sum = 0;

  splitInputByLine().forEach((line) => {
    const gamePair = getGamePair(line);

    let matches = 0;
    gamePair[1].forEach((number) => {
      if (number !== "" && gamePair[0].includes(number)) {
        console.log(number, " matches!");
        matches++;
      }
    });

    sum += matches ? 2 ** (matches - 1) : 0;
  });

  // Answer
  console.log(sum);
}

function part2() {
  let sum = 0;

  const scratchcards = splitInputByLine();
  const cardCount = Array(scratchcards.length).fill(1);

  scratchcards.forEach((line, index) => {
    console.log("CARD", index);
    const gamePair = getGamePair(line);

    let matches = 0;
    gamePair[1].forEach((number, index) => {
      if (number !== "" && gamePair[0].includes(number)) {
        console.log(number, " matches!");
        matches++;
      }
    });

    for (let i = 0; i < matches; i++) {
      cardCount[index + i + 1] += cardCount[index];
    }
    console.log(cardCount);
  });

  // Answer
  console.log(cardCount.reduce((a, b) => a + b, 0));
}

function getGamePair(line) {
  return line
    .split(":")[1]
    .split("|")
    .map((numbers) => numbers.trim().split(" "));
}

// part1();
part2();
