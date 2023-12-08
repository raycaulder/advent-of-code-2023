import {
  generateAdjacentIndeces,
  splitInputByLineWithGrid,
  symbolRegex,
  numberRegex,
} from "../helpers/index.js";

function part1() {
  const grid = splitInputByLineWithGrid();
  const maxDimensions = [grid[0].length - 1, grid.length - 1];
  // const symbolIndeces = findIndeces(grid, symbolRegex);

  // const numberIndeces = findIndeces(grid, numberRegex);

  const numberIndeces = [];
  const fullNumberArray = [];
  const summedNumberIndexArray = [];

  // Build array of digit locations and identify full numbers
  let numberIndex = 0;
  let isCurrentlyNumber = false;
  let numberString = "";
  grid.forEach((line, y) => {
    line.forEach((char, x) => {
      if (numberRegex.test(char)) {
        isCurrentlyNumber = true;
        numberIndeces.push([x, y, numberIndex]);
        numberString += char;
      } else {
        if (isCurrentlyNumber) {
          numberIndex++;
          fullNumberArray.push(parseInt(numberString));
          numberString = "";
        }
        isCurrentlyNumber = false;
      }
    });
  });

  console.log(fullNumberArray);

  // Find which indeces don't touch symbols
  numberIndeces.forEach((numberIndex) => {
    const [x, y] = numberIndex;
    const adjacentIndeces = [
      [x, y + 1], // Down
      [x + 1, y + 1], // Down right
      [x - 1, y + 1], // Down left
      [x, y - 1], // Up
      [x + 1, y - 1], // Up right
      [x - 1, y - 1], // Up left
      [x + 1, y], // Right
      [x - 1, y], // Left
    ];

    adjacentIndeces.forEach((adjacentIndex) => {
      const [adjacentX, adjacentY] = adjacentIndex;
      // Bail if we're out of bounds
      if (
        !(
          adjacentX < 0 ||
          adjacentY < 0 ||
          adjacentX > maxDimensions[0] ||
          adjacentY > maxDimensions[1]
        )
      ) {
        if (symbolRegex.test(grid[adjacentY][adjacentX])) {
          summedNumberIndexArray.push(numberIndex[2]);
        }
      }
    });
  });
  console.log(
    [...new Set(summedNumberIndexArray)].reduce(
      (a, b) => a + fullNumberArray[b],
      0
    )
  );
  // console.log(summedNumberArray.reduce((a, b) => a + b, 0));
}

function part2() {
  const grid = splitInputByLineWithGrid();
  const maxDimensions = [grid[0].length - 1, grid.length - 1];

  const numberIndeces = [];
  const fullNumberArray = [];
  const summedNumberIndexArray = [];
  const gearPairIndeces = [];

  // Build array of digit locations and identify full numbers
  let numberIndex = 0;
  let isCurrentlyNumber = false;
  let numberString = "";
  grid.forEach((line, y) => {
    line.forEach((char, x) => {
      if (numberRegex.test(char)) {
        isCurrentlyNumber = true;
        numberIndeces.push([x, y, numberIndex]);
        numberString += char;
      } else {
        if (isCurrentlyNumber) {
          numberIndex++;
          fullNumberArray.push(parseInt(numberString));
          numberString = "";
        }
        isCurrentlyNumber = false;
      }
    });
  });

  console.log(fullNumberArray);

  // Find which indeces don't touch symbols
  numberIndeces.forEach((numberIndex) => {
    const [x, y] = numberIndex;
    const adjacentIndeces = generateAdjacentIndeces(x, y);

    adjacentIndeces.forEach((adjacentIndex) => {
      const [adjacentX, adjacentY] = adjacentIndex;
      // Bail if we're out of bounds
      if (
        !(
          adjacentX < 0 ||
          adjacentY < 0 ||
          adjacentX > maxDimensions[0] ||
          adjacentY > maxDimensions[1]
        )
      ) {
        if (symbolRegex.test(grid[adjacentY][adjacentX])) {
          // Gear stuff
          if (grid[adjacentY][adjacentX] === "*") {
            const gearAdjacentIndeces = generateAdjacentIndeces(
              adjacentX,
              adjacentY
            );

            gearAdjacentIndeces.forEach((gearAdjacentIndex) => {
              const [gearAdjacentX, gearAdjacentY] = gearAdjacentIndex;
              // Bail if we're out of bounds
              if (
                !(
                  gearAdjacentX < 0 ||
                  gearAdjacentY < 0 ||
                  gearAdjacentX > maxDimensions[0] ||
                  gearAdjacentY > maxDimensions[1]
                )
              ) {
                if (numberRegex.test(grid[gearAdjacentY][gearAdjacentX])) {
                  // Filter indeces to find full number
                  const filteredNumberIndeces = numberIndeces.find(
                    (numberIndex) =>
                      numberIndex[0] === gearAdjacentX &&
                      numberIndex[1] === gearAdjacentY
                  );
                  if (filteredNumberIndeces[2] !== numberIndex[2]) {
                    gearPairIndeces.push([
                      filteredNumberIndeces[2],
                      numberIndex[2],
                    ]);
                  }
                }
              }
            });
          }
          summedNumberIndexArray.push(numberIndex[2]);
        }
      }
    });
  });

  //Gear time
  // Dedupe
  const newGearPairIndeces = [gearPairIndeces[0]];
  gearPairIndeces.forEach((gearPair) => {
    let gearPairFlag = false;
    newGearPairIndeces.forEach((gearPair2, index) => {
      if (
        (gearPair[0] === gearPair2[0] && gearPair[1] === gearPair2[1]) ||
        (gearPair[0] === gearPair2[1] && gearPair[1] === gearPair2[0])
      ) {
        gearPairFlag = true;
      }
    });
    if (!gearPairFlag) {
      newGearPairIndeces.push(gearPair);
    }
  });

  let summedProduct = 0;
  console.log(newGearPairIndeces);
  newGearPairIndeces.forEach((gearPair) => {
    const [gear1, gear2] = gearPair;

    summedProduct += fullNumberArray[gear1] * fullNumberArray[gear2];
    console.log("🚀 ~ file: main.js:196 ~ newGearPairIndeces.forEach ~ fullNumberArray[gear1] * fullNumberArray[gear2]:", fullNumberArray[gear1] * fullNumberArray[gear2])
    fullNumberArray[gear1] = 0;
    fullNumberArray[gear2] = 0;
  });

  console.log();

  // Answer
  const totalSum = [...new Set(summedNumberIndexArray)].reduce(
    (a, b) => a + fullNumberArray[b],
    0
  );

  console.log(fullNumberArray);

  console.log(summedProduct);
}

// part1();
part2();
