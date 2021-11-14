export {};
const [_, ...testCases] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

console.log(
  testCases.reduce(
    (answer, testCase) => `${answer}${solution(testCase)}\n`,
    "",
  ),
);

function solution(testCase: string) {
  const stack: string[] = [];
  for (let i = 0; i < testCase.length; i++) {
    if (testCase[i] === ")" && stack[stack.length - 1] === "(") {
      stack.pop();
    } else {
      stack.push(testCase[i]);
    }
  }
  return stack.length === 0 ? "YES" : "NO";
}
