var SmaugToken = artifacts.require("./SmaugToken.sol");

module.exports = function(deployer) {
  deployer.deploy(SmaugToken);
};
