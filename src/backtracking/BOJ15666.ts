export {};
// https://www.acmicpc.net/problem/15666
// N과 M (12)

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

const answer = new Set<string>();
const picked: number[] = [];
solution(0, 0);
console.log(Array.from(answer).join("\n"));

function solution(startIndex: number, depth: number) {
  if (depth === PICK) {
    answer.add(picked.join(" "));
    return;
  }

  for (let i = startIndex; i < TOTAL; i++) {
    picked.push(NUMBERS[i]);
    solution(i, depth + 1);
    picked.pop();
  }
}
