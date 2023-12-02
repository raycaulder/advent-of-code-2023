import { inputIterator } from "../helpers/index.js";

async function part1() {
  const constraints = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let sum = 0;

  inputIterator((line) => {
    // Parse the game ID
    const gameId = parseInt(line.split(":")[0].substring(5));
    // Parse each hand
    const handData = line.split(":")[1].trim().split(";");

    let isPossible = true;
    handData.forEach((game) => {
      // Split the colors and iterate
      handData.split(",").forEach((color) => {
        const cubeKeyValue = color.trim().split(" ");
        // Grab possibility as long as game is still possible
        isPossible = isPossible
          ? parseInt(cubeKeyValue[0]) <= constraints[cubeKeyValue[1]]
          : false;
      });
    });

    // Is the game possible, if yes then add id
    if (isPossible) sum += parseInt(gameId);
  }).then(() => {
    // Answer
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
    const handData = line.split(":")[1].trim().split(";");

    const minimumCubes = {
      red: 0,
      green: 0,
      blue: 0,
    };

    handData.forEach((hand) => {
      hand.split(",").forEach((color) => {
        const cubeKeyValue = color.trim().split(" ");

        // Set the minimum cubes value if new hand has a greater amount of cubes
        minimumCubes[cubeKeyValue[1]] =
          minimumCubes[cubeKeyValue[1]] < parseInt(cubeKeyValue[0])
            ? parseInt(cubeKeyValue[0])
            : minimumCubes[cubeKeyValue[1]];
      });
    });
    // Reduce list of values of object to get product of values, then add
    sum += Object.values(minimumCubes).reduce((a, b) => a * b);
  }).then(() => {
    // Answer
    console.log(sum);
  });
}

part1();
part2();
