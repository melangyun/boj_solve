export {};
const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let max = 0;
let answer = 0;
for (let i = inputs.length - 1; i > 0; i--) {
  if (max >= inputs[i]) continue;
  max = inputs[i];
  answer++;
}
console.log(answer);
