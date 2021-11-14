export {};
const [_, ...testCases] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

console.log(
  testCases.reduce((answer, testCase) => answer + solution(testCase), 0),
);

function solution(testCase: string) {
  const stack: string[] = [];
  for (let i = 0; i < testCase.length; i++) {
    if (stack[stack.length - 1] === testCase[i]) {
      stack.pop();
    } else {
      stack.push(testCase[i]);
    }
  }
  return stack.length === 0 ? 1 : 0;
}
