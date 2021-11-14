export {};

const [a, b] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

solution(a, b);

function solution(a: number, b: number): void {
  console.log(a + b);
}
