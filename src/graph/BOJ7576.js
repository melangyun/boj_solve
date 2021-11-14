const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [numbers, ...tomatoStrList] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [transverse, length] = numbers.split(" ").map(Number);
const tomatoes = [];
tomatoStrList.forEach(tomatoStr => tomatoes.push(tomatoStr.split(" ").map(Number)));

class Queue {
    constructor(){
        this.queue = [];
        this.head = 0;
    }

    enqueue(x, y){
        this.queue.push({x, y});
    }

    dequeue(){
        return this.isEmpty() ? undefined : this.queue[this.head++];
    }

    isEmpty(){
        return this.queue.length - this.head === 0;
    
    }
}

solution(tomatoes);

function solution(tomatoes){
    const ripeTomatoes = Array.from(Array(length)).map(_ => Array(transverse).fill(-1));
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    const queue = new Queue();

    let totalTomato = 0;
    let lastDay = 0;
    let ripeTomatoCnt = 0;

    for(let i = 0 ; i < tomatoes.length ; i++ ){
        for(let j = 0 ; j < tomatoes[i].length ; j++){
            if(tomatoes[i][j] !== -1) totalTomato++;
            if(tomatoes[i][j] === 1){
                queue.enqueue(i, j);
                ripeTomatoCnt++;
                ripeTomatoes[i][j] = 0;
            }
        }
    }

    while(!queue.isEmpty()){
        const pair = queue.dequeue();
        for(let i = 0; i < 4 ; i++){
            const nx = pair.x + dx[i];
            const ny = pair.y + dy[i];
            if(nx < 0 || nx >= length || ny < 0 || ny >= transverse){
                continue;
            }

            if(tomatoes[nx][ny] === 0 && ripeTomatoes[nx][ny] === -1){
                queue.enqueue(nx, ny);
                ripeTomatoes[nx][ny] = ripeTomatoes[pair.x][pair.y] + 1;
                ripeTomatoCnt++;
                if(ripeTomatoes[nx][ny] > lastDay){
                    lastDay = ripeTomatoes[nx][ny];
                }
            }
        }
    }
    console.log(totalTomato === ripeTomatoCnt ? lastDay : -1);
}