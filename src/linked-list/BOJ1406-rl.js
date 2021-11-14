

// https://www.acmicpc.net/problem/1406
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const input = [];

// 이중 연결 리스트
class TextEditor {
    // 0번지는 시작점을 나타내기 위한 node
    data= [-1]; // i번째 원소의 값
    prev= [-1]; // 이전 원소의 index
    next= [-1];  // 다음 원소의 index

    unused = 1; // 새로운 원소가 들어갈 수 있는 index
    pointer= 0; // 현재 위치를 가르치고 있는 포인터, 0일경우 가장 앞

    constructor(text){
        this.pointer = text.length;
        for(let i = 0 ; i < text.length ; i++){
            this.data.push(text[i]);
            this.prev.push(i);
            
            this.next[i] = this.unused++;
            this.next.push(-1);
        }
    }

    runCmd(cmd){
        if(cmd === "L") return this.moveLeft();

        if(cmd === "D") return this.moveRight();

        if(cmd === "B") return this.deleteLeft();

        const inputChar = cmd.split("P ")[1];
        return this.insertLeft(inputChar);
    }

    moveRight(){
        // 커서가 문장의 맨 뒤이면 무시됨
        if(this.isEndNode()) return;
        this.pointer = this.next[this.pointer];
    }

    moveLeft(){
        // 커서가 문장의 맨 앞이면 무시됨
        if(this.isFirstNode()) return;
        this.pointer = this.prev[this.pointer];
    }

    deleteLeft(){
        // 커서가 문장의 맨 앞이면 무시됨
        if(this.isFirstNode()) return;

        // 예외: 이전 노드가 지워져 없을 경우 prev를 -1 로 변경, next 노드를 다음 노드로 변경해주어야함
        // 이전 노드의 다음 노드 변경 => 마지막 노드였을 경우 -1
        this.next[this.prev[this.pointer]] = this.next[this.pointer] === -1 ?  -1 : this.next[this.pointer];
        // 다음 노드의 이전 노드 변경
        this.prev[this.next[this.pointer]] = this.prev[this.pointer];
        this.moveLeft();
    }

    insertLeft(inputChar){
        // 문자를 커서 왼쪽에 추가
        const newLocation = this.unused++;
        this.data[newLocation] = inputChar;
        this.next[newLocation] = this.next[this.pointer];
        this.prev[newLocation] = this.pointer;

        // 앞노드가 가르키는 뒷노드
        const nextNode = this.next[this.pointer];
        // 앞노드가 가르키는 뒷노드 변경
        this.next[this.pointer] = newLocation;
        // 뒷노드가 가르키는 앞노드 변경
        if(nextNode !== -1){
            this.prev[nextNode] = newLocation;
        }


        this.moveRight();
    }

    isEndNode(){
        return this.next[this.pointer] === -1;
    }

    isFirstNode(){
        return this.prev[this.pointer] === -1;
    }

    getData(){
        const result= [];
        let printingPointer = this.next[0];
        while(1){
            result.push(this.data[printingPointer]);
            if(this.next[printingPointer] === -1) break;
            printingPointer = this.next[printingPointer];
        }
        return result.join("");
    }
}


rl.on("line", (line)=>{
    input.push(...line.split("\n"));
}).on("close", ()=> {
    const [text, cnt, ...cmds] = input;
    const textEditor = new TextEditor(text);
    console.log(textEditor.getData());
});