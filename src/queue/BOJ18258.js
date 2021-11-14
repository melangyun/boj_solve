const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [_, ...cmds] = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Queue{
    queue = [];
    answer = [];
    head = 0;
    tail = 0;

    push(value){
        this.queue.push(value);
        this.tail++;
    }

    pop(){
        this.answer.push(this.head === this.tail ? -1 : this.queue[this.head++]);
    }
    
    empty(){
        this.answer.push(this.isEmpty() ? 1 : 0);
    }
    
    isEmpty(){
        return this.tail - this.head === 0;
    }

    size(){
        this.answer.push(this.tail - this.head);
    }

    front(){
        this.answer.push(this.isEmpty() ? -1 : this.queue[this.head]);
    }

    back(){
        this.answer.push(this.isEmpty() ? -1 :this.queue[this.tail - 1]);
    }
}

solution(cmds);

function solution(cmds){
    const queue = new Queue();
    cmds.forEach(cmd => {
        if(cmd === "front"){
            queue.front();
        }
        else if(cmd === "back"){
            queue.back();
        }
        else if(cmd === "size"){
            queue.size();
        }
        else if(cmd === "empty"){
            queue.empty();
        }
        else if(cmd === "pop"){
            queue.pop();
        }
        else{
            queue.push(cmd.split(" ")[1]);
        }
    });
    console.log(queue.answer.join("\n"));
}

