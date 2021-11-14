export {};
// https://www.acmicpc.net/problem/1182
// 부분수열의 합

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [NUMBER, GOAL] = inputStrings[0].split(" ").map(Number);
const numbers = inputStrings[1].split(" ").map(Number);

let count = 0;
solution(0, 0);
console.log(GOAL === 0 ? count - 1 : count);

function solution(curVal: number, total: number) {
  if (curVal === NUMBER) {
    if (total === GOAL) count++;
    return;
  }

  solution(curVal + 1, total);
  solution(curVal + 1, total + numbers[curVal]);
}
