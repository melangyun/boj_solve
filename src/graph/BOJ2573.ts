export {};

interface Node {
  h: number;
  w: number;
}

class Queue<T> {
  private data: Map<T, boolean>;
  constructor() {
    this.data = new Map();
  }

  enqueue(value: T) {
    this.data.set(value, true);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const output = this.data.keys().next().value;
    const returnValue = { ...output };
    this.data.delete(output);
    return returnValue;
  }

  isEmpty(): boolean {
    return this.data.size === 0;
  }
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let map: number[][] = [];
let nextMap: number[][] = [];
const dw = [0, 0, -1, 1];
const dh = [1, -1, 0, 0];

let queue;
let nextQueue = new Queue<Node>();
const [H, W] = inputStrings[0].split(" ").map(Number);

init();
solution();

function init() {
  for (let h = 1; h < inputStrings.length; h++) {
    const splittedNumber = inputStrings[h].split(" ").map(Number);
    for (let w = 0; w < splittedNumber.length; w++) {
      if (splittedNumber[h] !== 0) {
        nextQueue.enqueue({ h: h - 1, w });
      }
    }
    nextMap.push(splittedNumber);
  }
}

function solution() {
  iceMelt();
  console.log("nextMap:", nextMap);
  iceMelt();
  console.log("nextMap:", nextMap);
}

function iceMelt() {
  const visit = new Set<Node>();
  map = nextMap.map(row => row.slice());
  queue = nextQueue;
  nextQueue = new Queue<Node>();

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (!node) break;
    console.log("node:", node);

    for (let i = 0; i < 4; i++) {
      const nw = node.w + dw[i];
      const nh = node.h + dh[i];
      if (nw >= W || nw < 0 || nh >= H || nh < 0) continue;

      const next = { w: nw, h: nh };
      if (visit.has(next)) continue;
      if (map[nh][nw] === 0 && nextMap[node.h][node.w] > 0) {
        // 물일경우 - 방문을 표시하지 않는다.
        nextMap[node.h][node.w]--;
      } else if (map[nh][nw] > 0) {
        // 얼음일 경우 - 방문을 표시한다. 다음 queue 에 넣는다.
        nextQueue.enqueue(next);
        visit.add(next);
      }
    }
  }
  console.log("=========================");
}
