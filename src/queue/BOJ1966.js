const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [_, ...testCases] = require("fs").readFileSync(filePath).toString().trim().split("\n");
for(let i = 0 ; i < testCases.length ; i+=2){
    solution(Number(testCases[i].split(" ")[1]), testCases[i+1]);
}

function solution(toKnow, documents){
    const queue = documents.split(" ").map((priority, i) => ({priority: Number(priority), isTarget: i === toKnow}));
    let count = 0;
    
    while(queue.length){
        const head = queue.shift();
        let isPrintable = false;

        for(let i = 0 ; i < queue.length ; i++){
            if(head.priority < queue[i].priority){
                queue.push(head);
                break;
            }

            if(i === queue.length -1){
                isPrintable = true;
            }
        }

        if(isPrintable || queue.length === 0){
            count++;
            if(head.isTarget){
                return console.log(count);
            }
        }
    }

}