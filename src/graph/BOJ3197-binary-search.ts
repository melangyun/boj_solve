export {};

class Queue<T> {
  constructor(private queue: T[] = [], private head: number = 0) {}

  enqueue(value: T) {
    this.queue.push(value);
  }

  dequeue(): T | undefined {
    if (this.head === 800) {
      this.head = 0;
      this.queue.splice(0, 800);
    }
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length === this.head;
  }
}

interface Node {
  r: number;
  c: number;
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

// 행, 열
const [R, C] = inputStrings[0].split(" ").map(Number);
const d = [
  [-1, 1, 0, 0],
  [0, 0, -1, 1],
];
const map: string[][] = [];
const swans: Node[] = [];
const iceMeltMap: number[][] = Array.from(Array(R)).map(_ => Array(C).fill(-1));
const swanQueue = new Queue<Node>();
let endDay = 0;

init();
iceMeltingBFS();
console.log(binarySearch());

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    const splitStr = inputStrings[i].split("");
    for (let j = 0; j < splitStr.length; j++) {
      if (splitStr[j] === "X") continue;
      if (splitStr[j] === "L") {
        swans.push({ r: i - 1, c: j });
      }
      swanQueue.enqueue({ r: i - 1, c: j });
      iceMeltMap[i - 1][j] = 0;
    }
    map.push(splitStr);
  }
}

function binarySearch(): number {
  let start = 0;
  let end = endDay;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    if (findSwanMet(middle)) end = middle - 1;
    else start = middle + 1;
  }

  return start;
}

function findSwanMet(day: number): boolean {
  const queue = new Queue<Node>();
  const swanMap = Array.from(Array(R)).map(_ => Array(C).fill(false));
  swanMap[swans[0].r][swans[0].c] = true;
  queue.enqueue(swans[0]);

  while (!queue.isEmpty()) {
    const node = queue.dequeue();

    for (let i = 0; i < 4; i++) {
      const nr = node!.r + d[0][i];
      const nc = node!.c + d[1][i];

      if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;

      if (swanMap[nr][nc] === true || iceMeltMap[nr][nc] > day) continue;
      if (swans[1].r === nr && swans[1].c === nc) {
        return true;
      }
      swanMap[nr][nc] = true;
      queue.enqueue({ r: nr, c: nc });
    }
  }
  return false;
}

function iceMeltingBFS() {
  while (!swanQueue.isEmpty()) {
    const node = swanQueue.dequeue();

    for (let i = 0; i < 4; i++) {
      const nr = node!.r + d[0][i];
      const nc = node!.c + d[1][i];

      if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
      if (iceMeltMap[nr][nc] !== -1 || map[nr][nc] !== "X") continue;

      iceMeltMap[nr][nc] = iceMeltMap[node!.r][node!.c] + 1;
      if (endDay < iceMeltMap[nr][nc]) {
        endDay = iceMeltMap[nr][nc];
      }
      swanQueue.enqueue({ r: nr, c: nc });
    }
  }
}
