export {};
// https://www.acmicpc.net/problem/13913
// 숨바꼭질 4

class Queue<T> {
  private QueueOptimizeNum = 500;
  constructor(private data: T[] = [], private head = 0) {}

  enqueue(value: T) {
    this.data.push(value);
  }

  dequeue(): undefined | T {
    if (this.head === this.QueueOptimizeNum) {
      this.head = 0;
      this.data.splice(0, this.QueueOptimizeNum);
    }
    return this.isEmpty() ? undefined : this.data[this.head++];
  }

  getLastData(): T {
    return this.data[this.data.length - 1];
  }

  isEmpty() {
    return this.data.length === this.head;
  }
}

type Pair = { location: number; path: string };

const [START, END] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const limit = 200000;
const visit = {};
const queue = new Queue<Pair>();

solution();

function solution() {
  if (START >= END) {
    let path = "";
    for (let i = START; i >= END; i--) {
      path = `${path} ${i}`;
    }
    return console.log(`${START - END}\n${path.trim()}`);
  }

  queue.enqueue({ location: START, path: `${START}` });
  visit[START] = 0;

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (node === undefined) break;

    const teleport = node.location * 2;
    if (teleport > 0 && teleport <= limit && visit[teleport] === undefined) {
      queue.enqueue({ location: teleport, path: `${node.path} ${teleport}` });
      visit[teleport] = visit[node.location] + 1;

      if (teleport === END) printAnswer();
    }

    for (let i = -1; i < 2; i += 2) {
      const walk = node.location + i;
      if (walk < 0 || walk > limit || visit[walk] !== undefined) continue;
      queue.enqueue({ location: walk, path: `${node.path} ${walk}` });
      visit[walk] = visit[node.location] + 1;

      if (walk === END) printAnswer();
    }
  }
}

function printAnswer() {
  console.log(`${visit[END]}\n${queue.getLastData().path}`);
  process.exit(0);
}
