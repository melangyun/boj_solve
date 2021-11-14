export {};
// https://www.acmicpc.net/problem/1629
// 곱셈
// Olog(Repeat)의 시간복잡도
let [Input, Repeat, Mod] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(BigInt);

if (Input >= Mod) Input %= Mod;
console.log(solution(Input, Repeat).toString());

function solution(value: bigint, repeat: bigint): bigint {
  if (repeat === 1n) return value % Mod;

  const returnVal = solution(value, repeat / 2n);

  return repeat % 2n === 0n
    ? (returnVal * returnVal) % Mod
    : (returnVal * returnVal * value) % Mod;
}
