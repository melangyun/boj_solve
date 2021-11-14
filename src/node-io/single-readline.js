import { createInterface } from 'readline';

const r1 = createInterface({input: process.stdin, output: process.stdout});

r1.on("line", (line) => {
    console.log(line);
    r1.close();
}).on("close", ()=>{
    process.exit();
});

