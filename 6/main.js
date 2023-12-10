import {
  splitInputByLine,
  splitLineBySpaceAsNum,
  reduceProduct,
  removeSpaces,
} from "../helpers/index.js";

function part1() {
  const input = splitInputByLine();
  const time = splitLineBySpaceAsNum(input[0].split(":")[1]);
  const distance = splitLineBySpaceAsNum(input[1].split(":")[1]);
  const products = [];

  console.log(time, distance);

  for (let i = 0; i < time.length; i++) {
    console.log(time[i], distance[i]);
    let sum = 0;
    for (let j = 0; j < time[i]; j++) {
      const travelTime = time[i] - j;
      if (travelTime * j > distance[i]) {
        sum++;
      }
    }
    products.push(sum);
  }

  console.log(reduceProduct(products));
}

function part2() {
  const input = splitInputByLine();
  const time = [parseInt(removeSpaces(input[0].split(":")[1]))];
  const distance = [parseInt(removeSpaces(input[1].split(":")[1]))];
  const products = [];

  console.log(time, distance);

  for (let i = 0; i < time.length; i++) {
    console.log(time[i], distance[i]);
    let sum = 0;
    for (let j = 0; j < time[i]; j++) {
      const travelTime = time[i] - j;
      if (travelTime * j > distance[i]) {
        sum++;
      }
    }
    products.push(sum);
  }

  console.log(reduceProduct(products));
}
// part1();
part2();
