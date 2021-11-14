/* 3197번 labudovi
 * URL: https://www.acmicpc.net/problem/3197
 * Date: 2021-01-06 Wed 10:55:44 52m 34s
 * 참고URL: https://hsin.hr/2005/index.html
 */

"use strict";

const { exit } = require("process");

const getLine = (() => {
  const input = require("fs").readFileSync("./input.txt").toString().split("\n");
  let index = 0;
  return () => input[index++];
})();

const [R, C] = getLine()
  .split(" ")
  .map(str => Number(str));
const board = [];
for (let i = 0; i < R; i++) {
  board.push(getLine().split(""));
}

let tempIceQ = [];
let start = [];
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (board[i][j] === "X") continue;
    if (board[i][j] === "L") start = [i, j];

    tempIceQ.push([i, j]);
  }
}

const visited = Array.from(Array(R), () => Array(C).fill(false));

let tempSwanQ = [];
tempSwanQ.push(start);
visited[start[0]][start[1]] = true;

for (let day = 0; true; day++) {
  console.log("day: ", day);
  console.log("board: ", board);
  const sq = [...tempSwanQ];
  tempSwanQ = [];
  let shead = 0;
  while (shead < sq.length) {
    const [cx, cy] = sq[shead++];

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
      if (visited[nx][ny]) continue;

      // water
      if (board[nx][ny] === ".") {
        visited[nx][ny] = true;
        sq.push([nx, ny]);
      }
      // ice
      else if (board[nx][ny] === "X") {
        visited[nx][ny] = true;
        tempSwanQ.push([nx, ny]);
      }
      // swan
      else if (board[nx][ny] === "L") {
        console.log(day);
        exit(0);
      }
    }
  }

  const iq = [...tempIceQ];
  tempIceQ = [];
  let ihead = 0;
  while (ihead < iq.length) {
    const [cx, cy] = iq[ihead++];

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
      if (board[nx][ny] === "." || board[nx][ny] === "L") continue;

      board[nx][ny] = ".";
      tempIceQ.push([nx, ny]);
    }
  }
  // console.table(board);
}
