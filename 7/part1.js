import { splitInputByLine } from "../helpers/index.js";

function part1() {
  const input = splitInputByLine();
  const cardSet = input.map((line) => line.split(" "));

  let sum = 0;
  const sortedHand = quickSort(cardSet);

  sortedHand.forEach((hand, index) => {
    console.log(hand[1], index + 1);
    sum += parseInt(hand[1]) * (index + 1);
  });

  console.log(sortedHand);

  // Answer
  console.log(sum);
}

function part2() {
  const input = splitInputByLine();
  const cardSet = input.map((line) => line.split(" "));

  let sum = 0;
  const sortedHand = quickSort(cardSet);

  sortedHand.forEach((hand, index) => {
    console.log(hand[1], index + 1);
    sum += parseInt(hand[1]) * (index + 1);
  });

  console.log(sortedHand);

  // Answer
  console.log(sum);
}

function strongestHandCompare(hand1, hand2) {
  const handObj1 = getHandObject(hand1);
  const handObj2 = getHandObject(hand2);

  if (getHandRanking(handObj1) === getHandRanking(handObj2)) {
    return tieBreak(hand1, hand2);
  }

  return getHandRanking(handObj1) > getHandRanking(handObj2);
}

// Gets the numerical value of hand for comparison
function getHandRanking(handObj) {
  const values = Object.values(handObj);
  const valueArray = values.sort().reverse();

  if (valueArray[0] === 5) return 6; // 5 of a kind
  if (valueArray[0] === 4) return 5; // 4 of a kind
  if (valueArray[0] === 3 && valueArray[1] === 2) return 4; // Full house
  if (valueArray[0] === 3) return 3; // 3 of a kind
  if (valueArray[0] === 2 && valueArray[1] === 2) return 2; // 2 pair
  if (valueArray[0] === 2) return 1; // 1 pair
  if (valueArray[0] === 1) return 0; // High card
}

// Gets a comparable data object for use in ranking determination
function getHandObject(hand) {
  const countObj = {};
  [...hand].forEach((card) => {
    if (countObj[card]) countObj[card]++;
    else countObj[card] = 1;
  });
  return countObj;
}

function tieBreak(hand1, hand2) {
  for (let i = 0; i < hand1.length; i++) {
    const card1Rank = cardRanking(hand1[i]);
    const card2Rank = cardRanking(hand2[i]);
    if (card1Rank === card2Rank) continue;
    else return card1Rank > card2Rank;
  }
}

// Compares two individual cards for tiebreaking
function cardRanking(card) {
  const cardRankings = "23456789TJQKA";
  return cardRankings.indexOf(card);
}

function quickSort(game) {
  if (game.length <= 1) return game;
  const pivot = game[0];
  const left = [];
  const right = [];
  for (let i = 1; i < game.length; i++) {
    if (strongestHandCompare(game[i][0], pivot[0])) right.push(game[i]);
    else left.push(game[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// part1();
part2();
