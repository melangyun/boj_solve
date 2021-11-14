export {};

// https://www.acmicpc.net/problem/1941
// 소문난 칠공주

class Queue<T> {
  constructor(private data: T[] = [], private head = 0) {}

  enqueue(input: T) {
    this.data.push(input);
  }

  dequeue(): T | null {
    return this.isEmpty() ? null : this.data[this.head++];
  }

  isEmpty(): boolean {
    return this.data.length - this.head === 0 && this.init();
  }

  init() {
    this.data = [];
    this.head = 0;
    return true;
  }
}

interface Pair {
  x: number;
  y: number;
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const SIZE = 5;
const map: string[][] = [];
const visit: boolean[][] = Array.from(Array(SIZE)).map(_ =>
  Array(SIZE).fill(false),
);
let count = 0;
const queue = new Queue<Pair>();

init();
solution();
console.log(count);

function init() {
  for (let i = 0; i < inputStrings.length; i++) {
    map.push(inputStrings.split(""));
  }
}

function solution() {
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      queue.enqueue({ x, y });
      bfs();
    }
  }
}

function bfs() {
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (node === null) break;

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + node.x;
      const ny = dy[i] + node.y;

      if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) continue;
      if (map[node.x][node.y] === map[nx][ny]) continue;
    }
  }
}
