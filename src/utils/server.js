// const express = require('express');
// const server = express();
// server.all('/', (req, res)=>{
//    res.setHeader('Content-Type', 'text/html');
//    res.write('Nice');
//    res.end();
// })
// function keepAlive(){
//    server.listen(3000, ()=>{console.log("Server is online!")});
// }
// module.exports = keepAlive;
// less dependencies
var http=require('http');

var server=http.createServer(function(req,res){
    res.end('test');
});

server.on('listening',function(){
    console.log('ok, server is running');
});

function keepAlive(){
   server.listen(3000, ()=>{console.log("Server is online!")});
}

module.exports = keepAlive