import { inputIterator } from "../helpers/index.js";

async function part1() {
  const constraints = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let sum = 0;

  inputIterator((line) => {
    const gameId = parseInt(line.split(":")[0].substring(5));
    const gameData = line.split(":")[1].trim().split(";");

    let isPossible = true;
    gameData.forEach((game) => {
      game.split(",").forEach((color) => {
        const cubeKeyValue = color.trim().split(" ");
        isPossible = isPossible
          ? parseInt(cubeKeyValue[0]) <= constraints[cubeKeyValue[1]]
          : false;
      });
    });
    if (isPossible) sum += parseInt(gameId);
    else {
    }
  }).then(() => {
    console.log(sum);
  });
}

async function part2() {
  const constraints = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let sum = 0;

  inputIterator((line) => {
    const gameId = parseInt(line.split(":")[0].substring(5));
    const handData = line.split(":")[1].trim().split(";");

    const minimumCubes = {
      red: 0,
      green: 0,
      blue: 0,
    };

    handData.forEach((hand) => {
      hand.split(",").forEach((color) => {
        const cubeKeyValue = color.trim().split(" ");
        minimumCubes[cubeKeyValue[1]] =
          minimumCubes[cubeKeyValue[1]] < parseInt(cubeKeyValue[0])
            ? parseInt(cubeKeyValue[0])
            : minimumCubes[cubeKeyValue[1]];
      });
    });

    sum += Object.values(minimumCubes).reduce((a, b) => a * b);
  }).then(() => {
    console.log(sum);
  });
}

// part1();
part2();
