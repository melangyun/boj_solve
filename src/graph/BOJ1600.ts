export {};
// https://www.acmicpc.net/problem/1600
// 말이 되고픈 원숭이

class Queue<T> {
  constructor(private queue: T[] = [], private head: number = 0) {}

  enqueue(value: T) {
    this.queue.push(value);
  }

  dequeue(): T | undefined {
    if (this.head === 300) {
      this.head = 0;
      this.queue.splice(0, 300);
    }
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length === this.head;
  }
}
type Node = { w: number; h: number; k: number };

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const K = Number(inputStrings[0].trim());
const [W, H] = inputStrings[1].split(" ").map(Number);
const map: number[][] = [];
const dWalk = [
  [1, -1, 0, 0],
  [0, 0, -1, 1],
];
const dHorse = [
  [-1, -2, -2, -1, 1, 2, 2, 1],
  [2, 1, -1, -2, -2, -1, 1, 2],
];

init();
solution();

function init() {
  for (let i = 2; i < inputStrings.length; i++) {
    map.push(inputStrings[i].split(" ").map(Number));
  }
}

function solution() {
  const visit: number[][][] = Array.from(Array(K + 1)).map(_ =>
    Array.from(Array(H)).map(_ => Array(W).fill(-1)),
  );

  const queue = new Queue<Node>();
  queue.enqueue({ w: 0, h: 0, k: 0 });
  visit[0][0][0] = 0;

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (node === undefined) break;

    if (node.h === H - 1 && node.w === W - 1) {
      return console.log(visit[node.k][node.h][node.w]);
    }

    for (let i = 0; i < 4; i++) {
      const nw = node.w + dWalk[1][i];
      const nh = node.h + dWalk[0][i];

      if (nw < 0 || nw >= W || nh < 0 || nh >= H) continue;

      // 장애물이 없고, 이전에 방문한적이 없어야함
      if (map[nh][nw] === 0 && visit[node.k][nh][nw] === -1) {
        queue.enqueue({ w: nw, h: nh, k: node.k });
        visit[node.k][nh][nw] = visit[node.k][node.h][node.w] + 1;
      }
    }

    if (node.k >= K) {
      continue;
    }

    for (let i = 0; i < 8; i++) {
      const nw = node.w + dHorse[1][i];
      const nh = node.h + dHorse[0][i];

      if (nw < 0 || nw >= W || nh < 0 || nh >= H) continue;

      if (map[nh][nw] === 0 && visit[node.k + 1][nh][nw] === -1) {
        queue.enqueue({ w: nw, h: nh, k: node.k + 1 });
        visit[node.k + 1][nh][nw] = visit[node.k][node.h][node.w] + 1;
      }
    }
  }

  console.log(-1);
}
