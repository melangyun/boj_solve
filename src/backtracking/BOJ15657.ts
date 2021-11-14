export {};
// https://www.acmicpc.net/problem/15656
// N과 M (7)

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [TOTAL, PICK] = inputStrings[0].split(" ").map(Number);
const NUMBERS = inputStrings[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const answer: string[] = [];

solution(0, [], 0);
console.log(answer.join("\n"));

function solution(startIndex: number, picked: number[], depth: number) {
  if (depth === PICK) {
    answer.push(picked.join(" "));
    return;
  }

  for (let i = startIndex; i < TOTAL; i++) {
    picked.push(NUMBERS[i]);
    solution(i, picked, depth + 1);
    picked.pop();
  }
}
