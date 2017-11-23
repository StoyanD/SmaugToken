var SmaugToken = artifacts.require("./SmaugToken.sol");
const assertJump = require('./helpers/assertJump');

contract('SmaugToken', function(accounts){
  var instance;

  beforeEach(async function() {
    instance = await SmaugToken.new();
  });
});//end contract tests
