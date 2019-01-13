const crypto = require("crypto");

function sha256(data) {
    let hX = crypto.createHash("sha256").update(data, "binary");
    // console.log("hash: ", hX);
    return hX.digest("hex");   // digest参数的类型可以是 ‘hex’， 'base64'
}


// console.log("result: ", sha256("string or binary"));
// console.log("result: ", sha256("string or binary"));
// console.log("result: ", sha256("string or binary1"));
// console.log("result: ", sha256("string or binary2"));

/*
result:  V/0Bsfc/QOYxuTRMBzmvltZekY6Ge1F6RJ2GCKXDIdY=
result:  V/0Bsfc/QOYxuTRMBzmvltZekY6Ge1F6RJ2GCKXDIdY=
result:  A5Og/m4RLtjNg/8Dn5NdBle5FbJrwvO53qczygQgRxQ=
result:  sGtLXQt3IdSnTjCyHaXswH4NtPZNK9rSO0U/K45l21E=
*/

module.exports = sha256
