let WebSocketServer = require('ws').Server;


let wsArray = new Array();
let conns = new Array();

 startWS = () => {
    wsserver = new WebSocketServer({ port: 8181 });
    console.log("启动WS服务...")
    wsserver.on('connection', function (ws, req) {
        
        wsArray.push(ws)
        conns.push(req.connection);
        
        const ip = req.connection.remoteAddress;
        console.log("conn: ", req.connection)
        console.log("remote IP: ", ip)

        console.log('websockett client connected');
        ws.on('message', function (msg) {
            console.log("String msg received", msg);
            
            for(var i=0; i<conns.length; i++){
                if(conns[i]!=connection){
                    conns[i].send(msg);
                }
            }

            ws.send("2")
        });
    });

    return wsserver;
}

module.exports = {  start: startWS }
