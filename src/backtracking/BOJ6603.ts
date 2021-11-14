export {};

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const testCases: number[][] = [];
const answer: string[] = [];
const PICK = 6;

init();
testCases.forEach(testCase => solution(testCase));
console.log(answer.join("\n").trim());

function init() {
  for (let i = 0; i < inputStrings.length - 1; i++) {
    const [NUMBER, ...DATA] = inputStrings[i].split(" ");
    testCases.push(DATA);
  }
}

function solution(testCase: number[]) {
  recursion(0, [], 0);
  answer.push("");

  function recursion(depth: number, picked: number[], startIndex: number) {
    if (depth === PICK) {
      answer.push(picked.join(" "));
      return;
    }

    for (let i = startIndex; i < testCase.length; i++) {
      picked.push(testCase[i]);
      recursion(depth + 1, picked, i + 1);
      picked.pop();
    }
  }
}
