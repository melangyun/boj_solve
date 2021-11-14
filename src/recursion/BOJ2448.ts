// https://www.acmicpc.net/problem/2448
// 별찍기 - 11

export {};
const input = +require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

let answer = "";
// 1, 3, 5
// 7
// 24
for (let i = 0; i < input; i++) {
  answer += `${"*".repeat(3 * 2 ** i)}\n`;
}

console.log(answer);
