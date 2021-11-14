export {};

//https://www.acmicpc.net/problem/1405
// 미친 로봇

const [N, ...info] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const direction: number[] = info.map(value => value * 0.01);
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const MAX: number = (N + 1) * 2;
const visit = Array.from(Array(MAX)).map(_ =>
  Array.from(Array(MAX)).fill(false),
);

let answer = 0;

dfs(N, N, 0, 1);
console.log(answer === 1 ? "1.0" : answer);

function dfs(x: number, y: number, depth: number, percentage: number) {
  if (depth === N) {
    answer += percentage;
    return;
  }
  visit[x][y] = true;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (visit[nx][ny] === false) {
      dfs(nx, ny, depth + 1, percentage * direction[i]);
    }
  }
  visit[x][y] = false;
}
