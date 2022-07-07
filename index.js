
const express = require('express');
let app = express();

let connect = [];
let count = 0;

app.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    connect.push(res);
})
.listen(3000, () => {
    console.log('start');
});


setTimeout(function timer() {
    console.log(`conter: ${count} ; now: ${new Date().toUTCString()}`);

    count++;

    if(count > 30) {
        for(let i = 0; i < connect.length; i++) {
            connect[i].write(`stop  (${new Date().toUTCString()})`);
            connect[i].end();
        }
        
        process.exit();
    }

    for(let i = 0; i < connect.length; i++) {
        connect[i].write(`id: ${i} <br>`);
    }

    setTimeout(timer, 1000);
}, 1000);
