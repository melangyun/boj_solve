class Deque{
    data = {};
    head = 0;
    tail = 1;
  
    addFront(value) {
      this.data[this.head--] = value;
    }
  
    addBack(value) {
      this.data[this.tail++] = value;
    }
  
    popFront(){
      if (this.isEmpty()) return undefined;
      return this.data[++this.head];
    }
  
    isEmpty(){
      return this.head + 1 === this.tail;
    }
}

const [START, END] = require("fs").readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split(" ").map(Number);
const limit = 100002;
console.log(solution());

function solution() {
    if (START === END) return 0;
    if (START > END) return START - END;
  
    const visit = {};
    const deque = new Deque();
  
    deque.addBack(START);
    visit[START] = 0;
  
    while (!deque.isEmpty()) {
      const node = deque.popFront();
  
      const teleport = node * 2;
      if (teleport === END) return visit[node];
      if (teleport < limit && visit[teleport] === undefined) {
        visit[teleport] = visit[node];
        deque.addFront(teleport);
      }
  
      for (let i = -1; i < 2; i += 2) {
        const walk = node + i;
        if (walk < 0 || walk >= limit || visit[walk] !== undefined) continue;
        if (walk === END) return visit[node] + 1;
  
        visit[walk] = visit[node] + 1;
        deque.addBack(walk);
      }
    }
  }