export {};
// https://www.acmicpc.net/problem/1920
// 수찾기
const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const testCases = inputStrings[3].split(" ").map(Number);
const numbers = inputStrings[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let answer = "";
for (let i = 0; i < testCases.length; i++) {
  answer += `${solution(testCases[i])}\n`;
}
console.log(answer);

function solution(target: number) {
  let start = 0;
  let end = numbers.length - 1;
  while (start <= end) {
    const middle = Math.round((start + end) / 2);
    if (numbers[middle] < target) start = middle + 1;
    else if (numbers[middle] === target) return 1;
    else end = middle - 1;
  }

  return 0;
}
