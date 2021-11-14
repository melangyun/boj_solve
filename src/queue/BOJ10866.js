const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [size, ...cmds] = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Dequeue{
    constructor(size) {
        this.arr = new Array(size * 2  + 1);
        this.head = size;
        this.tail = size - 1;
        this.cnt = 0;
        this.answer = "";
    }

    pushFront(input){
        this.arr[--this.head] = input;
        this.cnt++;
    }

    pushBack(input){
        this.arr[++this.tail] = input;
        this.cnt++;
    }

    popFront(){
        if(this.cnt < 1){
            this.answer += "-1\n";
            return;
        }
        this.cnt--;
        this.answer += `${this.arr[this.head++]}\n`;
    }

    popBack(){
        if(this.cnt < 1){
            this.answer += "-1\n";
            return;
        }
        this.cnt--;
        this.answer += `${this.arr[this.tail--]}\n`;
    }

    size(){
        this.answer += `${this.cnt}\n`;
    }

    empty(){
        this.answer += `${this.cnt ? 0 : 1}\n`;
    }

    front(){
        this.answer += `${this.cnt ? this.arr[this.head] : -1}\n`;
    }
    
    back(){
        this.answer += `${this.cnt ? this.arr[this.tail] : -1}\n`;
    }
}

solution(size, cmds);

function solution(size, cmds){
    const dequeue = new Dequeue(size);
    for(const cmd of cmds){
        if(cmd === "front") dequeue.front();
        else if(cmd === "back") dequeue.back();
        else if(cmd === "empty" ) dequeue.empty();
        else if(cmd === "size") dequeue.size();
        else if(cmd === "pop_front") dequeue.popFront();
        else if(cmd === "pop_back") dequeue.popBack();
        else {
            const [str, input]= cmd.split(" ");
            if(str === "push_front") dequeue.pushFront(input);
            else if(str === "push_back") dequeue.pushBack(input);
        }
    }
    console.log(dequeue.answer);
}