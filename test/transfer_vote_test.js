var SmaugToken = artifacts.require("./TransferVote.sol");
const assertJump = require('./helpers/assertJump');

contract('TransferVote', function(accounts){
  var instance;

  beforeEach(async function() {
    instance = await TransferVote.new(86400);//1 day in seconds
  });

});
