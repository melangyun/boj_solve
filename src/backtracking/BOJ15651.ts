export {};
// https://www.acmicpc.net/problem/15651
// N과 M (3)

const [END, TOTAL_COUNT] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const answer: string[] = [];
const arr: number[] = [];

solution(0);
console.log(answer.join("\n"));

function solution(value) {
  if (value === TOTAL_COUNT) {
    answer.push(arr.join(" "));
    return;
  }

  for (let i = 1; i <= END; i++) {
    arr[value] = i;
    solution(value + 1);
  }
}
