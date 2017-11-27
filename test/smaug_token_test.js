var SmaugToken = artifacts.require("./SmaugToken.sol");
const assertJump = require('./helpers/assertJump');

contract('SmaugToken', function(accounts){
  var instance;

  beforeEach(async function() {
    instance = await SmaugToken.new();
  });

  it("should initialize the token contract with the right owner and initial balance", async function(){
    let val = await instance.decimals.call();
    assert.equal(val.valueOf(), 18, "decimals should be 18");
    let owner = await instance.owner();
    assert.equal(owner.valueOf(), accounts[0], "the owner should be the first account");

    let tokens = await instance.totalSupply();
    let ownerTokens = await instance.balanceOf(owner);
    assert.equal(ownerTokens.valueOf(), tokens.valueOf(), "The owner should have all the tokens at contract init");
    assert.equal(tokens.valueOf(), 1e+22, "initial token supply should be 10,000 * 1e+18( ie the decimal precision we want)");
  });

  it("should only allow owner to call forcibly transfer token balances", async function(){

  });
});//end contract tests
