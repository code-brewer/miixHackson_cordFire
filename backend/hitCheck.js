

var posArr=[
    [3,1,3],
    [1,2,1],[2,2,1],[3,2,1],[4,2,1],[5,2,1],
    [3,3,1],[5,3,1],
    [2,4,1],[3,4,1],[4,4,1],[5,4,1],[7,4,1],
    [4,5,3],[5,5,1],[6,5,1],[7,5,1],
    [3,6,3],[5,6,1],[7,6,1],
    [1,7,1],[2,7,1],[3,7,1],[4,7,1],[5,7,1],
    [3,8,1],
    [2,9,1],[3,9,1],[4,9,1]  
   ]

hitCheck = (compoent, pos /* (x, y) */) => {
    let length = posArr.length;
    ret = '2';

    let x = pos[0];
    let y = pos[1];

    for(let i=0; i <length; i++) {
        let candidate = posArr[i];
        // console.log("hitCheck: ", candidate, 'x=', x, 'y=', y);
        if( candidate[0] == y && candidate[1]== x) {
            // console.log("hitCheck: ", candidate[2]);
            return String(candidate[2]);
        }
    }
    return ret;
}

hitCheck(null, [3,1])
hitCheck(null, [1,2])

module.exports = hitCheck