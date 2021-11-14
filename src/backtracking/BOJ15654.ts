export {};
// https://www.acmicpc.net/problem/15654
// N과 M (5)

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

const visit: boolean[] = [];
const picked: number[] = [];
const answer: string[] = [];

solution(0);
console.log(answer.join("\n"));

function solution(depth: number) {
  if (depth === PICK) {
    answer.push(picked.join(" "));
    return;
  }

  for (let i = 0; i < TOTAL; i++) {
    if (visit[i]) {
      continue;
    }

    visit[i] = true;
    picked.push(NUMBERS[i]);
    solution(depth + 1);
    picked.pop();
    visit[i] = false;
  }
}
