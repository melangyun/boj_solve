export {};
// https://www.acmicpc.net/problem/9944
// NxM 보드 완주하기
type Size = { X: number; Y: number };
type Node = { x: number; y: number };

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const Sizes: Array<Size> = [];
const MAP: string[][][] = [];
const BlankCount: number[] = [];
let testCaseNum = 0;
// 우, 상, 좌, 하
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

init();
const answer: number[] = [];
let visit: boolean[][] = [];
for (let i = 0; i < testCaseNum; i++) {
  solution(i);
}
let result = "";
for (let i = 0; i < answer.length; i++) {
  result += `Case ${i + 1}: ${answer[i] === undefined ? -1 : answer[i]}\n`;
}
console.log(result);

function init() {
  for (let i = 0; i < inputStrings.length; i++) {
    let blankCnt = 0;
    testCaseNum++;

    const [X, Y] = inputStrings[i].split(" ").map(Number);
    Sizes.push({ X, Y });

    const map: string[][] = [];

    for (let j = i + 1; j <= i + X; j++) {
      const row = inputStrings[j].split("");
      blankCnt += row.filter(el => el === ".").length;
      map.push(row);
    }

    MAP.push(map);
    BlankCount.push(blankCnt);
    i += X;
  }
}

function visitInit(i: number) {
  visit = Array.from(Array(Sizes[i].X)).map(_ =>
    Array.from(Array(Sizes[i].Y), () => false),
  );
}

function solution(testNumber: number) {
  if (BlankCount[testNumber] === 1) {
    answer[testNumber] = 0;
    return;
  }

  for (let x = 0; x < Sizes[testNumber].X; x++) {
    for (let y = 0; y < Sizes[testNumber].Y; y++) {
      if (MAP[testNumber][x][y] === "*") continue;
      for (let i = 0; i < 4; i++) {
        visitInit(testNumber);
        visit[x][y] = true;
        dfs({ x, y }, 1, testNumber, i, 1);
        visit[x][y] = false;
      }
    }
  }
}

function dfs(
  node: Node,
  dist: number,
  index: number,
  dir: number,
  count: number,
) {
  if (answer[index] && answer[index] <= count) {
    return;
  }

  if (dist === BlankCount[index]) {
    answer[index] = answer[index] ? Math.min(answer[index], count) : count;
    return;
  }

  const nx = dx[dir] + node.x;
  const ny = dy[dir] + node.y;

  if (isAccessAble({ x: nx, y: ny }, index)) {
    visit[nx][ny] = true;
    dfs({ x: nx, y: ny }, dist + 1, index, dir, count);
    visit[nx][ny] = false;
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (i === dir) continue;

    const next = { x: dx[i] + node.x, y: dy[i] + node.y };
    if (!isAccessAble(next, index)) continue;

    visit[next.x][next.y] = true;
    dfs(next, dist + 1, index, i, count + 1);
    visit[next.x][next.y] = false;
  }
}

function isAccessAble(node: Node, index: number) {
  return (
    node.x >= 0 &&
    node.x < Sizes[index].X &&
    node.y >= 0 &&
    node.y < Sizes[index].Y &&
    MAP[index][node.x][node.y] === "." &&
    visit[node.x][node.y] === false
  );
}
