export {};
// https://www.acmicpc.net/problem/16236
// 아기 상어

interface Node {
  h: number;
  w: number;
}

class Queue<T> {
  constructor(private data: T[] = [], private head: number = 0) {}

  isEmpty(): boolean {
    return this.data.length === this.head && this.init();
  }

  enqueue(value: T) {
    this.data.push(value);
  }

  dequeue(): T | null {
    return this.isEmpty() ? null : this.data[this.head++];
  }

  private init(): true {
    this.data = [];
    this.head = 0;
    return true;
  }
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const dh = [0, 1, 0, -1];
const dw = [-1, 0, 1, 0];

const SIZE = +inputStrings[0];
const map: number[][] = [];
const queue = new Queue<Node>();
let totalFishCnt = 0;

let sharkSize = 2;
let experienceCnt = 0;
let cnt = 0;
let time = 0;
let start: Node;

init();
solution();
console.log(time);

function init() {
  for (let h = 1; h < inputStrings.length; h++) {
    const row: number[] = [];
    for (let w = 0; w < inputStrings[h].length; w += 2) {
      const value = +inputStrings[h][w];
      row.push(value);

      if (value === 0) continue;

      if (value === 9) {
        row[row.length - 1] = 0;
        start = { h: h - 1, w: w / 2 };
        continue;
      }

      totalFishCnt++;
    }
    map.push(row);
  }
}

function solution() {
  if (totalFishCnt === 0) return;

  while (totalFishCnt !== cnt) {
    if (bfs(start)) break;
  }
}

function bfs(start: Node) {
  const visit: number[][] = Array.from(Array(SIZE)).map(_ =>
    Array(SIZE).fill(-1),
  );
  let ateFishes: Node[] = [];
  let shortestLength = Number.MAX_SAFE_INTEGER;

  queue.enqueue(start);
  visit[start.h][start.w] = 0;

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (node === null) break;

    for (let i = 0; i < 4; i++) {
      const nh = node.h + dh[i];
      const nw = node.w + dw[i];
      if (nh >= SIZE || nh < 0 || nw >= SIZE || nw < 0) continue;
      if (visit[nh][nw] !== -1 || map[nh][nw] > sharkSize) continue; // 방문했거나, 사이즈가 클때
      if (shortestLength < visit[node.h][node.w] + 1) continue; // 현재 최단 물고기 보다 멀때

      // 아기 상어는 자기보다 작은 물고기만 먹을수있다.(같은 크기 x)
      const next = { h: nh, w: nw };
      visit[nh][nw] = visit[node.h][node.w] + 1;
      queue.enqueue(next);

      // 물고기가 없거나 자기와 같은 크기의 물고기는 지나갈 수만 있다.
      if (map[nh][nw] === sharkSize || map[nh][nw] === 0) continue;

      if (visit[nh][nw] === shortestLength) ateFishes.push(next);
      else {
        shortestLength = visit[nh][nw];
        ateFishes = [next];
      }
    }
  }

  // 먹을게 없다면 종료
  if (ateFishes.length === 0) return true;
  ateFishes.sort((a, b) => (a.h !== b.h ? a.h - b.h : a.w - b.w));

  eatFish(ateFishes[0], shortestLength);
}

function eatFish(fish: Node, length: number) {
  start = fish;
  map[start.h][start.w] = 0;
  time += length;
  cnt++;
  experienceCnt++;
  if (experienceCnt === sharkSize) levelUp();
}

function levelUp() {
  experienceCnt = 0;
  sharkSize++;
}
