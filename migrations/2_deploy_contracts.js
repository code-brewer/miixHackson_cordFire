// var token = artifacts.require("./ToDo.sol");
var cordFire = artifacts.require("./cordFire.sol");

module.exports = function(deployer) {
  // deployer.deploy(token, 1000000, "GUIDE", 6, "GD");
  deployer.deploy(cordFire, 1000000, "GUIDE", 6, "GD");
};
