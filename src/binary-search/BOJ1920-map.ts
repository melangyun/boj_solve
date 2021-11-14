export {};
// https://www.acmicpc.net/problem/1920
// 수찾기
const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const testCases = inputStrings[3].split(" ");

const NumberMap: Map<string, number> = new Map();
inputStrings[1]
  .split(" ")
  .forEach(number => NumberMap.set(number, (NumberMap.get(number) || 0) + 1));

let answer = "";
testCases.forEach(testCase => (answer += `${NumberMap.get(testCase) || 0}\n`));
console.log(answer);
