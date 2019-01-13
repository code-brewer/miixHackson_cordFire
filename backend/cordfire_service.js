// require("babel-register");

const TronWeb = require('tronweb');

// This provider is optional, you can just use a url for the nodes instead
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.shasta.trongrid.io'); // Full node http endpoint
const solidityNode = new HttpProvider('https://api.shasta.trongrid.io'); // Solidity node http endpoint
const eventServer = new HttpProvider('https://api.shasta.trongrid.io'); // Contract events http endpoint
// Ref:  https://github.com/tronprotocol/tron-web

let artifact = require('../src/contracts/CordFire.json'); // WYH: 注意: 需要在编译完合约后，copy 到 ./src/contracts/ToDo 位置

let tronboxConfig = require('../tronbox.js')

let hitCheck = require('./hitCheck')

const privateKey = tronboxConfig.networks['shasta'].privateKey;
console.log(">>>>> privateKey ", privateKey);

let contract = null;

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);

init();

let gameInfo = {}

function getAccount() {
    return privateKey;
}

async function init() {

    let address = tronWeb.address.fromHex(artifact.networks['*'].address);
    // console.log("合约信息: abi ", artifact.abi)
    console.log("合约信息:  address ", artifact.abi, artifact.networks['*'].address, address)
    contract = tronWeb.contract(artifact.abi, address);  //WYH: 根据合约地址， ABI， 得到合约对象！ 
    console.log("=========================== got contract ===========================")
    // console.log(this.contract)
}

startGame = async (opponent, cordsHash) => {
    try {
        if (!contract) { console.log("abort...., contract instance is null");}
        
        opponent = '0xb1e9f54bd8cf4d402c2cd384293e68be6accdd5a'
        opponent = tronWeb.address.toHex(opponent);
        let result = await contract.startGame(opponent,cordsHash)

        return result
      } catch (error) {
          console.log(error)
          throw(error);
          return false
      };
}

/**
 * 需要对传入的对手帐号做 hex 转换： 
 */
startGame2 = async (opponent, cordsHash) => {
    try {
        if (!contract) { console.log("abort...., contract instance is null");}
        
        setOpponentCords(opponent, cordsHash);

        opponent = tronWeb.address.toHex(opponent);
        let result = await contract.startGame(opponent,cordsHash)
        let getBack = await contract.getCords(opponent);
        console.log("get back cords: ", getBack);

        return result
      } catch (error) {
          console.log(error)
          throw(error);
          return false
      };
}

/**
 * 模拟选手在游戏开始前的向 server 提交自己的布局的操作（同样的，判断是否击中，也由后台、而不是中心server来判断）
 */
setOpponentCords = (curPlayer, cords) => {
    gameInfo[curPlayer] = cords;
}

/**
 * 目前，从性能角度
 */
goGame = (opponent, pos) => {
    let y = parseInt(pos[0], 16);
    let x = parseInt(pos[1], 16);
    let hitted = hitCheck(opponent, [x, y] );
    return hitted
}

module.exports = {
    getAccount : getAccount,
    startGame: startGame2,
    setOpponentCords: setOpponentCords,
    goGame: goGame

}
