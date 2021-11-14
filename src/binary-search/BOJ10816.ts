export {};
// https://www.acmicpc.net/problem/10816
// 숫자 카드2

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const cards = inputStrings[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const testCases = inputStrings[3].split(" ").map(Number);
let answer = "";
for (let i = 0; i < testCases.length; i++) {
  answer += solution(testCases[i]);
}
console.log(answer);

function solution(target: number) {
  return `${upperIndex(target) - lowerIndex(target)}\n`;
}

function lowerIndex(target: number) {
  let start = 0;
  let end = cards.length;

  while (start < end) {
    const middle = Math.floor((start + end) / 2);
    if (cards[middle] >= target) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  return start;
}

function upperIndex(target: number) {
  let start = 0;
  let end = cards.length;

  while (start < end) {
    const middle = Math.floor((start + end) / 2);
    if (cards[middle] > target) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }

  return start;
}
