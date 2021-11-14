export {};
// https://www.acmicpc.net/problem/2667
// 단지 번호 붙이기
class Queue<T> {
  constructor(private queue: T[] = [], private head = 0) {}

  enqueue(value: T) {
    this.queue.push(value);
  }

  dequeue(): T | undefined {
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.head === this.queue.length && this.init();
  }

  init() {
    this.queue = [];
    this.head = 0;
    return true;
  }
}
type Node = { x: number; y: number };
const dx = [0, 1, -1, 0];
const dy = [1, 0, 0, -1];

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const SIZE = Number(inputStrings[0]);
const map: number[][] = [];

init();
solution();

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    map.push(inputStrings[i].trim().split("").map(Number));
  }
}

function solution() {
  const answer: number[] = [];
  const numberingMap: number[][] = Array.from(Array(SIZE)).map(_ =>
    Array(SIZE).fill(0),
  );

  const queue = new Queue<Node>();
  let numbering = 0;

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      // 방문 했거나, 집이 없는 곳이라면 패쓰
      if (numberingMap[x][y] !== 0 || map[x][y] === 0) continue;

      numberingMap[x][y] = ++numbering;
      answer[numbering - 1] = 1;
      queue.enqueue({ x, y });

      while (!queue.isEmpty()) {
        const node = queue.dequeue();

        if (node === undefined) break;

        for (let i = 0; i < 4; i++) {
          const nx = node.x + dx[i];
          const ny = node.y + dy[i];

          if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) {
            continue;
          }

          if (numberingMap[nx][ny] === 0 && map[nx][ny] === 1) {
            queue.enqueue({ x: nx, y: ny });
            numberingMap[nx][ny] = answer[0];
            answer[numbering - 1]++;
          }
        }
      }
    }
  }

  console.log(`${numbering}\n${answer.sort((a, b) => a - b).join("\n")}`);
}
