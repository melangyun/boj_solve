export {};
// https://www.acmicpc.net/problem/2638
// 치즈

interface Node {
  h: number;
  w: number;
}

class Queue<T> {
  constructor(private data: T[] = [], private head = 0) {}

  enqueue(value: T) {
    this.data.push(value);
  }

  dequeue(): T | null {
    return this.isEmpty() ? null : this.data[this.head++];
  }

  isEmpty(): boolean {
    return this.data.length === this.head;
  }
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [HEIGHT, WIDTH] = inputStrings[0].split(" ").map(Number);
const dh = [0, 0, -1, 1];
const dw = [1, -1, 0, 0];
let nextMap: number[][] = [];
let visit: number[][];
let day = 0;

init();
solution();

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    nextMap.push(inputStrings[i].split(" ").map(Number));
  }
}

function solution() {
  while (true) {
    bfs();
  }
}

// 2변 이상이 접촉하고 있다면, 녹음
function bfs() {
  const map = nextMap;
  const queue = new Queue<Node>();

  let isCheeseExist = false;
  nextMap = map.map(value => {
    if (!isCheeseExist) isCheeseExist = !!value.find(v => v === 1);
    return value.slice();
  });
  if (!isCheeseExist) {
    console.log(day);
    process.exit();
  }

  visit = Array.from(Array(HEIGHT)).map(_ => Array(WIDTH).fill(0));

  nextMap[0][0] = 0;
  visit[0][0] = -1;
  queue.enqueue({ h: 0, w: 0 });

  while (!queue.isEmpty()) {
    const space = queue.dequeue();
    if (!space) break;

    for (let i = 0; i < 4; i++) {
      const nh = dh[i] + space.h;
      const nw = dw[i] + space.w;

      if (nh < 0 || nh >= HEIGHT || nw < 0 || nw >= WIDTH) continue;
      if (map[nh][nw] === 0 && visit[nh][nw] === -1) continue;
      if (map[nh][nw] === 0 && visit[nh][nw] !== -1) {
        queue.enqueue({ h: nh, w: nw });
        visit[nh][nw] = -1;
        nextMap[nh][nw] = 0;
        continue;
      }

      visit[nh][nw]++;

      if (visit[nh][nw] === 2) nextMap[nh][nw] = 0;
    }
  }
  day++;
}
