var HoardNodes = artifacts.require("./HoardNodes.sol");
const assertJump = require('./helpers/assertJump');

contract('HoardNodes', function(accounts){
  var instance;

  beforeEach(async function() {
    instance = await HoardNodes.new();
  });

  it("should test stuff", async function(){
  });
});
