export {};
// https://www.acmicpc.net/problem/15649
// N과 M

const [END, COUNT] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let answer = "";
// 수열을 담을 배열
const arr: number[] = [];
// 특정 수가 쓰였는지 체크
const visit: boolean[] = [];

solution(0);
console.log(answer);

function solution(value: number) {
  if (value === COUNT) {
    let result = arr.reduce((str, val) => `${str}${val} `, "");
    answer += `${result}\n`;
    return;
  }

  for (let i = 1; i <= END; i++) {
    if (!visit[i]) {
      arr[value] = i;
      visit[i] = true;
      solution(value + 1);
      visit[i] = false;
    }
  }
}
