// https://www.acmicpc.net/problem/20164
// 홀수 홀릭 호석
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

let MAX = -1;
let MIN = 10e9;

solution(input, 0);
console.log(MIN,MAX);

function solution(value, oddCnt) {
  const totalCnt = oddCnt + getOddCnt(value);

  if (value.length === 1) {
    MIN = Math.min(MIN, totalCnt);
    MAX = Math.max(MAX, totalCnt);
    return;
  }

  if (value.length === 2) {
    return solution(`${Number(value[0]) + Number(value[1])}`, totalCnt);
  }

  for (let i = 1; i < value.length; i++) {
    for (let j = i + 1; j < value.length; j++) {
      const str1 = value.slice(0, i);
      const str2 = value.slice(i, j);
      const str3 = value.slice(j);
      solution(`${Number(str1) + Number(str2) + Number(str3)}`, totalCnt);
    }
  }
}

function getOddCnt(value) {
  let oddCnt = 0;
  for (const char of value) {
    if (Number(char) % 2 === 1) oddCnt++;
  }

  return oddCnt;
}
