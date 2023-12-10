import { splitInputByLine } from "../helpers/index.js";

function main() {
  const input = splitInputByLine();
  const cardSet = input.map((line) => line.split(" "));

  let sum = 0;
  const sortedHand = quickSort(cardSet);

  sortedHand.forEach((hand, index) => {
    sum += parseInt(hand[1]) * (index + 1);
  });

  // Answer
  console.log(sum);
}

// Compare hand 1 to hand 2 and return true if hand 1 ranks higher
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
  const tempObj = { ...handObj };
  const jokers = tempObj["J"];
  delete tempObj["J"];
  const values = Object.values(tempObj);
  const valueArray = values.sort().reverse();

  // Handle Jokers
  if (jokers) {
    valueArray[0] += jokers;
  }
  // Handles an edge case that took me forever to debug
  if (valueArray[0] === 5 || jokers === 5) return 6; // 5 of a kind
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
  const cardRankings = "J23456789TQKA";
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

function test() {
  console.assert(
    strongestHandCompare("JJJJJ", "JJJJ5") === false,
    "JJJJJ > JJJJ5"
  );
  console.assert(
    strongestHandCompare("33JJJ", "333JK") === true,
    "33JJJ > 333JK"
  );
  console.assert(
    strongestHandCompare("333JK", "33JJJ") === false,
    "33JJJ > 333JK"
  );
  console.assert(
    strongestHandCompare("333JJ", "333JK") === true,
    "333JJ > 333JK"
  );
  console.assert(
    strongestHandCompare("JJJJJ", "333JK") === true,
    "JJJJJ > 333JK"
  );
  console.assert(
    strongestHandCompare("3333J", "JJJJJ") === true,
    "3333J > JJJJJ"
  );
  console.assert(
    strongestHandCompare("JJJJQ", "333JK") === true,
    "JJJJQ > 333JK"
  );
}

test();
main();
