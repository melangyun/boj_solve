const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let answer = "";

for (let i = 1; i < inputStrings.length; i++) {
  answer += `Case #${i}: ${inputStrings[i]
    .split(" ")
    .reduce((sum, val) => sum + Number(val), 0)}\n`;
}

console.log(answer);
