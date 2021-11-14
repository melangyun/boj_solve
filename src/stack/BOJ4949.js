const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const sentences = require("fs").readFileSync(filePath).toString().trim().split("\n");
solution(sentences);

function solution(sentences){
    const open = ["(", "["];
    const closed = [")", "]"];
    const result = [];
    sentences.slice(0, sentences.length-1).forEach(sentence=>{
        let isNo = false;
        const stack = [];

        for(let i = 0 ; i < sentence.length ; i++ ){
            const char = sentence[i];
            if(open.includes(char)){
                stack.push(char);
            }
            else if (closed.includes(char) && stack.pop() !== open[closed.indexOf(char)]){
                result.push("no");
                isNo = true;
                break;
            }
        }
        if (!isNo) {
            result.push(stack.length === 0 ?  "yes" : "no");
        }
    })

    console.log(result.join("\n"));
}