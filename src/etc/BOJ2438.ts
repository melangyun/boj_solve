export {};
// https://www.acmicpc.net/problem/2438

const input = +require("fs").readFileSync("/dev/stdin").toString().trim();

let str = "";
let answer = "";
for (let i = 1; i <= input; i++) {
  str += "*";
  answer += `${str}\n`;
}
console.log(answer);
