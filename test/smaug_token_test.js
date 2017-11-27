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
    let owner = await instance.owner();

    //test wrong user attempting to transfer
    try{
        await instance.adminTransfer(owner, accounts[1], 1000000, {from: accounts[2]});
        assert.fail('should have thrown before');
    }catch(error){
      //shouldn't be able to call transfer if not owner
      assertJump(error);
    }

    //test invalid account to transfer
    try{
        await instance.adminTransfer(owner, '0x0', 1000000, {from: owner});
        assert.fail('should have thrown before');
    }catch(error){
      //shouldn't be able to transfer to empty address
      assertJump(error);
    }

    //test not enough funds in account to make transfer
    let ownerTokens = await instance.balanceOf(owner);
    try{
        await instance.adminTransfer(owner, accounts[1], ownerTokens*2, {from: owner});
        assert.fail('should have thrown before');
    }catch(error){
      //shouldn't be able to transfer more than they have
      assertJump(error);
    }

    //test correct transfer from owner
    let a1Tokens = await instance.balanceOf(accounts[1]);
    assert.equal(a1Tokens.valueOf(), 0, "initial account 1 tokens should be 0");

    let res = await instance.adminTransfer.call(owner, accounts[1], 1000, {from: owner});
    assert.equal(res.valueOf(), true, "transaction should return true and be successful");
    await instance.adminTransfer(owner, accounts[1], 1000, {from: owner});

    a1Tokens = await instance.balanceOf(accounts[1]);
    assert.equal(a1Tokens.valueOf(), 1000, "new account 1 tokens should be 1000");

    //test correct transfer by owner of someone elses funds
    await instance.adminTransfer(accounts[1], accounts[2], 1000, {from: owner});
    let a2Tokens = await instance.balanceOf(accounts[2]);
    assert.equal(a2Tokens.valueOf(), 1000, "account 2 tokens should be 1000");
    a1Tokens = await instance.balanceOf(accounts[1]);
    assert.equal(a1Tokens.valueOf(), 0, "new account 1 tokens should be 0");

    //test not enough funds to transfer against
    try{
        await instance.adminTransfer(accounts[2], accounts[1], 1001, {from: owner});
        assert.fail('should have thrown before');
    }catch(error){
      //shouldn't be able to transfer more than they have
      assertJump(error);
    }
  });
});//end contract tests
