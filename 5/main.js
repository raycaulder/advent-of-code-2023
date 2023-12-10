import {
  splitInputByLine,
  numberRegex,
  splitLineBySpace,
  splitLineBySpaceAsNum,
} from "../helpers/index.js";

function part1() {
  const input = splitInputByLine();
  const startingSeeds = splitLineBySpaceAsNum(input[0].split(":")[1].trim());
  let numberMapping = startingSeeds;

  const almanac = input.splice(2);
  let mappedIndexes = [];

  almanac.forEach((line) => {
    // Return if line is empty or doesn't start with a number
    if (line === "" || !numberRegex.test(line[0])) {
      mappedIndexes = [];
      return;
    }

    // 0 is dest, 1 is source, 2 is range
    const lineMap = splitLineBySpaceAsNum(line);

    numberMapping = numberMapping.map((number, index) => {
      const intNumber = parseInt(number);
      if (
        intNumber >= lineMap[1] &&
        intNumber <= lineMap[1] + lineMap[2] &&
        !mappedIndexes.includes(index)
      ) {
        mappedIndexes.push(index);
        return lineMap[0] + (intNumber - lineMap[1]);
      }

      return number;
    });
  });

  console.log(Math.min(...numberMapping));
}
function part2() {
  const PAGE_SIZE = 100;

  const input = splitInputByLine();
  const startingSeedArray = splitLineBySpaceAsNum(
    input[0].split(":")[1].trim()
  );

  let runningMin = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < startingSeedArray.length / 2; i++) {
    for (
      let j = startingSeedArray[i * 2];
      j < startingSeedArray[i * 2 + 1] + startingSeedArray[i * 2];
      j += PAGE_SIZE
    ) {
      let numberMapping = [];

      for (let n = 0; n < PAGE_SIZE; n++) {
        numberMapping.push(j + n);
      }

      const almanac = input.splice(2);
      let mappedIndexes = [];

      almanac.forEach((line) => {
        // Return if line is empty or doesn't start with a number
        if (line === "" || !numberRegex.test(line[0])) {
          mappedIndexes = [];
          return;
        }

        // 0 is dest, 1 is source, 2 is range
        const lineMap = splitLineBySpaceAsNum(line);

        numberMapping = numberMapping.map((number, index) => {
          const intNumber = parseInt(number);
          if (
            intNumber >= lineMap[1] &&
            intNumber <= lineMap[1] + lineMap[2] &&
            !mappedIndexes.includes(index)
          ) {
            mappedIndexes.push(index);
            return lineMap[0] + (intNumber - lineMap[1]);
          }

          return number;
        });
      });

      runningMin = Math.min(...numberMapping, runningMin);
      console.log(runningMin);
    }
  }
}

// part1();
part2();
