const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const input = [];


rl.on("line", (line)=>{
    input.push(...line.split("\n"));
}).on("close", ()=> {
    const [cnt, ...cmds] = input;
    solution(cnt, cmds);
});

const stack = [];
let top = 0;
let answer = "";

function solution(cnt, cmds){
    if(cnt === 0) return;
    if(cnt === 1 ) cmds = [cmds];
    cmds.forEach(cmd => stackCmd(cmd));
    console.log(answer);
}

function stackCmd(cmd){
    if(cmd === "top"){
        result = top === 0 ? -1 : stack[top];
        answer = answer + `${result}\n`
    }
    else if(cmd === "size"){
        answer += `${top}\n`
    }
    else if(cmd === "empty"){
        result = top === 0 ? 1 : 0;
        answer += `${result}\n`
    }
    else if(cmd === "pop"){
        if(!top) return answer += `${result}\n`
        result = stack[top--];
        answer += `${result}\n`;
    }else{
        stack[++top] = cmd.split("push ")[1];
    }
}