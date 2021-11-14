export {};
// https://www.acmicpc.net/problem/10818

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let max = -10e6;
let min = 10e6;
const list = inputStrings[1].split(" ").forEach(value => {
  max = Math.max(max, value);
  min = Math.min(min, value);
});

console.log(min, max);
