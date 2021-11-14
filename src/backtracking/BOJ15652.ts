export {};
// https://www.acmicpc.net/problem/15652
// N과 M (4)

const [END, TOTAL_COUNT] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const answer: string[] = [];
solution(1, [], 0);
console.log(answer.join("\n"));

function solution(startIndex: number, picked: number[], count: number) {
  if (count === TOTAL_COUNT) {
    answer.push(picked.join(" "));
    return;
  }

  for (let i = startIndex; i <= END; i++) {
    picked.push(i);
    solution(i, picked.slice(), count + 1);
    picked.pop();
  }
}
