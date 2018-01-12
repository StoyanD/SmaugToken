var HoardNodes = artifacts.require("./HoardNodes.sol");
const assertJump = require('./helpers/assertJump');

contract('HoardNodes', function(accounts){
  var instance;
  const owner = accounts[0];

  beforeEach(async function() {
    instance = await HoardNodes.new();
  });

  describe('nodes should be able to be created by owner', function() {
    beforeEach(async function() {
      assert.equal(await instance.getNodeCount.call().valueOf(), 0, "init node count should be 0");
    });

    it("should be able for only owner to create node", async () => {
      //test node create
      let nodeCreate = await instance.newNode(accounts[1], 123);
      let nodes = await instance.getNodeCount();
      assert.equal(nodes.valueOf(), 1, "after node create count should be 1");
    });

    it("should not allow non-owener to create node", async () => {
      //test fail when non-owner tries to create node
      try{
          await instance.newNode(accounts[2], 123, {from : accounts[1]});
          assert.fail('should have thrown before');
      }catch(error){
        //shouldn't be able to create new node if not owner
        assertJump(error);
        nodes = await instance.getNodeCount();
        assert.equal(nodes.valueOf(), 0, "after node create error count should be 0");
      }
    });
  });

  describe('nodes should be able to be managed by owner', function(){
    const nodeAddress = accounts[1];
    const emptyAddress = accounts[2];
    //create a node
    beforeEach(async function() {
      assert.equal(await instance.getNodeCount.call().valueOf(), 0, "init node count should be 0");
      await instance.newNode(nodeAddress, 123);
      assert.equal(await instance.getNodeCount.call().valueOf(), 1, "after node create count should be 1");
      assert.equal(await instance.getNodeData.call(nodeAddress).valueOf(), 123, "after node create data should be 123");
      assert.equal(await instance.isNode.call(nodeAddress).valueOf(), true, "node should exist");
    });

    it("should update node by owner", async () => {
      await instance.updateNode(nodeAddress, 5);
      assert.equal(await instance.getNodeData.call(nodeAddress).valueOf(), 5, "updated node data should be 5");
    });

    it("should not allow non-owner to update node", async () => {
      try{
          await instance.updateNode(nodeAddress, 5, {from: nodeAddress});
          assert.fail('should have thrown before');
      }catch(error){
        //shouldn't be able to create new node if not owner
        assertJump(error);
      }
    });

    it("should fail to update non-existant node", async () =>{
      try{
          await instance.updateNode(emptyAddress, 5);
          assert.fail('should have thrown before');
      }catch(error){
        //shouldn't be able to update non-existant node
        assertJump(error);
      }
    });

    it("should delete node by owner", async () =>{
      await instance.deleteNode(nodeAddress);
      assert.equal(await instance.isNode.call(nodeAddress).valueOf(), false, "node should not-exist");
    });

    it("should not allow non-owner to delete node", async () => {
      try{
          await instance.deleteNode(nodeAddress, {from: nodeAddress});
          assert.fail('should have thrown before');
      }catch(error){
        //shouldn't be able to create new node if not owner
        assertJump(error);
      }
      assert.equal(await instance.isNode.call(nodeAddress).valueOf(), true, "node should still exist");
    });

    it("should fail to delete non-existant node", async () =>{
      try{
          await instance.deleteNode(emptyAddress);
          assert.fail('should have thrown before');
      }catch(error){
        //shouldn't be able to delete non-existant node
        assertJump(error);
      }
    });

  });

});
