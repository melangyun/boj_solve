export {};
// https://www.acmicpc.net/problem/15650
// N과 M (2)

const [END, TOTAL_COUNT] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let answer = "";
solution(1, [], TOTAL_COUNT);
console.log(answer);

function solution(startIndex: number, picked: number[], count: number) {
  if (count === 0) {
    answer += `${picked.join(" ")}\n`;
    return;
  }

  for (let i = startIndex; i <= END; i++) {
    picked.push(i);
    solution(i + 1, picked.slice(), count - 1);
    picked.pop();
  }
}
