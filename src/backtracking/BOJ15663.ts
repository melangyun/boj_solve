export {};
// https://www.acmicpc.net/problem/15663
// N과 M (9)

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
const visit: boolean[] = [];

solution(0);
console.log(Array.from(answer).join("\n"));

function solution(depth: number) {
  if (depth === PICK) {
    answer.add(picked.join(" "));
    return;
  }

  for (let i = 0; i < TOTAL; i++) {
    if (visit[i]) continue;

    visit[i] = true;
    picked.push(NUMBERS[i]);
    solution(depth + 1);
    picked.pop();
    visit[i] = false;
  }
}
