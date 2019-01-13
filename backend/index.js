//express_demo.js 文件
let express = require('express');
let app = express();
let hashFunc = require('./sha256.js')
let blockChainService = require('./cordfire_service')

let ws = require('./ws_server')

app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   next();
});


app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/startGame', function (req, res) {
    console.log("startGame: submit data: ", req.query);
       
   //  let cords = req.query.planeCords
    let cords = JSON.stringify(req.query);
   
    // let opponent = req.query.opponent;
    let opponent = '0xb1e9f54bd8cf4d402c2cd384293e68be6accdd5a';

   //  let result = blockChainService.startGame(opponent, cordsHash);
    let result = "OK";
    let response = {status: '200', result: result};
   //  res.end(JSON.stringify(response));
    res.end('1');
 })

/**
 * 返回值： ‘1’ 击中，‘2’：未击中， ‘3’： 击毁
 */
app.get('/goGame', function (req, res) {
   console.log("goGame() : submit data: ", req.query);
   
   //let pos = req.query.pos
   // let opponent = '0xb1e9f54bd8cf4d402c2cd384293e68be6accdd5a';
   
   let pos = req.query.aimPoint; 
   let opponent = req.query.userWallet;
   let result = blockChainService.goGame(opponent, pos);
   let response = {status: '200', result: result};
  //  res.end(JSON.stringify(response));
   res.end(result);
})

 app.get('/endGame', function(req, res) {
   //  let cords = req.query.planeCords
   let cords = JSON.stringify(req.query);
   let result = blockChainService.gameOver(opponent, pos);
   let response = {status: '200', result: result};
 })

app.get('/testChain', function(req, res){
    blockChainService.test();
 })


 app.get('/test', function(req, res) {
    let json = {
        code: 200,
        msg: '请求成功',
        data: {
            userId: '123456',
            name: 'Terry',
            blog: 'https://yunm.coding.me'
        }
    }
    
    res.send(json)
 })

 app.get('/testChain', function(req, res){
    blockChainService.test();
 })

let server = app.listen(8081, function () {
 
//   ws.start();

  let host = server.address().address
  let port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
