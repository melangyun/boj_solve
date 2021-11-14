export {};
// https://www.acmicpc.net/problem/2839
// 설탕 배달

const kiloGram = +require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const bound5 = Math.floor(kiloGram / 5);
const left = kiloGram % 5;
const bound3 = Math.floor(left / 3);
const total = bound5 + bound3;
const left3 = left % 3;
if (left3 !== 0) {
  const retry3 = kiloGram % 3;
  console.log(retry3);
  if (retry3 !== 0) {
    console.log("어디냐 넌");
    console.log(-1);
    process.exit(0);
  }
  const division = kiloGram / 3;
  console.log(division, total);
  if ((division <= total && left3 === 0) || left3 !== 0) {
    console.log("dmd?");
    console.log(division);
    process.exit(0);
  }
}
console.log("d읭");
console.log(left3 !== 0 ? -1 : bound5 + bound3);
