import { exit } from "process";

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
const visit: boolean[][] = Array.from(Array(R)).map(_ => Array(C).fill(false));
let swan: Node;
let nextDayIceQueue = new Queue<Node>();
let nextDaySwanQueue = new Queue<Node>();

init();
solution();

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    const splitStr = inputStrings[i].split("");
    for (let j = 0; j < splitStr.length; j++) {
      if (splitStr[j] === "X") continue;
      if (splitStr[j] === "L") swan = { r: i - 1, c: j };

      nextDayIceQueue.enqueue({ r: i - 1, c: j });
    }
    map.push(splitStr);
  }
}

function solution() {
  nextDaySwanQueue.enqueue(swan);
  visit[swan.r][swan.c] = true;

  for (let day = 0; true; day++) {
    swanBfs(day);
    iceMeltingBFS();
  }
}

function swanBfs(day: number) {
  const swanQueue = nextDaySwanQueue;
  nextDaySwanQueue = new Queue<Node>();
  while (!swanQueue.isEmpty()) {
    const node = swanQueue.dequeue();

    for (let i = 0; i < 4; i++) {
      const nr = node!.r + d[0][i];
      const nc = node!.c + d[1][i];

      if (nr < 0 || nc < 0 || nr >= R || nc >= C) continue;
      if (visit[nr][nc]) continue;
      visit[nr][nc] = true;

      if (map[nr][nc] === ".") {
        // 물
        swanQueue.enqueue({ r: nr, c: nc });
      } else if (map[nr][nc] === "X") {
        // 얼음
        nextDaySwanQueue.enqueue({ r: nr, c: nc });
      } else if (map[nr][nc] === "L") {
        // 백조
        console.log(day);
        exit(0);
      }
    }
  }
}

function iceMeltingBFS() {
  const iceQueue = nextDayIceQueue;
  nextDayIceQueue = new Queue<Node>();

  while (!iceQueue.isEmpty()) {
    const node = iceQueue.dequeue();
    for (let i = 0; i < 4; i++) {
      const nr = node!.r + d[0][i];
      const nc = node!.c + d[1][i];

      if (nr < 0 || nc < 0 || nr >= R || nc >= C) continue;
      if (map[nr][nc] !== "X") continue;

      map[nr][nc] = ".";
      nextDayIceQueue.enqueue({ r: nr, c: nc });
    }
  }
}
