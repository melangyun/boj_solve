const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const input = [];


rl.on("line", (line)=>{
    input.push(...line.split("\n").map(Number));
}).on("close", ()=> {
    const [k, ...calledList] = input;
    solution(k, calledList);
});

function solution(k, calledList){
    const ledger = [];
    
    calledList.forEach((money)=>{
        if(money === 0){
            ledger.pop();
        }else {
            ledger.push(money);
        }
    });
    
    console.log(ledger.reduce((total, money) => total + money, 0));
}
