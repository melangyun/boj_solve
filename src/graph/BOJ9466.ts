export {};
// https://www.acmicpc.net/problem/9466
// 텀프로젝트

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let answer = "";
let visit, finish: boolean[];
let count: number;

for (let i = 1; i < inputStrings.length; i++) {
  answer += `${solution(
    Number(inputStrings[i++]),
    inputStrings[i].split(" ").map(Number),
  )}\n`;
}

console.log(answer);

function solution(studentNumber: number, choice: number[]) {
  visit = new Array(studentNumber + 1);
  finish = new Array(studentNumber + 1);
  count = 0;
  for (let student = 1; student <= studentNumber; student++) {
    if (!visit[student]) dfs(student, choice);
  }
  return studentNumber - count;
}

function dfs(student: number, choice: number[]) {
  visit[student] = true;
  const nextStudent = choice[student - 1];
  if (!visit[nextStudent]) {
    dfs(nextStudent, choice);
  } else if (!finish[nextStudent]) {
    for (let i = nextStudent; i !== student; i = choice[i - 1]) {
      count++;
    }
    count++;
  }
  finish[student] = true;
}
