export {};

const [input, target] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

solution(input, target);

function solution(input: string, target: string) {
  const filteredStr = input.replace(/[0-9]/gi, "");
  console.log(filteredStr.indexOf(target) !== -1 ? 1 : 0);
}
