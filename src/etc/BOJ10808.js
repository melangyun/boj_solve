const readline = require('readline');

const r1 = readline.createInterface({input: process.stdin, output: process.stdout});

r1.on("line", (line) => {
    const alphabetCnt = new Array(26).fill(0);
    for(let i = 0 ; i < line.length ; i++){
        const aIndex = "a".charCodeAt();
        const alphabetIndex = line[i].charCodeAt() - aIndex;
        alphabetCnt[alphabetIndex] = alphabetCnt[alphabetIndex] ? alphabetCnt[alphabetIndex] + 1 : 1;
    }
    console.log(alphabetCnt.join(" "));
    r1.close();
}).on("close", ()=>{
    process.exit();
});