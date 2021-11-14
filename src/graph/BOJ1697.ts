export {};
// https://www.acmicpc.net/problem/1697

const [startLocation, sisterLocation] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

class Queue<T> {
  constructor(private queue: T[] = [], private head = 0) {}

  enqueue(input: T) {
    this.queue.push(input);
  }

  dequeue(): T | null {
    return this.isEmpty() ? null : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length - this.head === 0;
  }
}

solution(startLocation, sisterLocation);

function solution(startLocation: number, sisterLocation: number) {
  if (startLocation >= sisterLocation) {
    return console.log(startLocation - sisterLocation);
  }

  const queue = new Queue<number>();
  const road: Array<number> = [];
  const b = [1, -1];

  queue.enqueue(startLocation);
  road[startLocation] = 0;

  while (!queue.isEmpty()) {
    const prevLocation = queue.dequeue();
    if (!prevLocation && prevLocation !== 0) break;

    for (let i = 0; i < 3; i++) {
      const nextLocation = i === 2 ? prevLocation * 2 : prevLocation + b[i];

      if (!road[nextLocation] && nextLocation >= 0 && nextLocation <= 100000) {
        road[nextLocation] = road[prevLocation] + 1;
        queue.enqueue(nextLocation);

        if (sisterLocation === nextLocation) {
          return console.log(road[nextLocation]);
        }
      }
    }
  }
}
