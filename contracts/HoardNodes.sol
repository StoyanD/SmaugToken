pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract HoardNodes is Ownable{
  struct NodeStruct {
      uint nodeData;
      uint listPointer;
    }

    mapping(address => NodeStruct) public nodeStructs;
    address[] public nodeList;

    function HoardNodes() {
    }

    function isNode(address nodeAddress) public constant returns(bool isIndeed) {
      if(nodeList.length == 0) return false;
      return (nodeList[nodeStructs[nodeAddress].listPointer] == nodeAddress);
    }

    function getNodeCount() public constant returns(uint nodeCount) {
      return nodeList.length;
    }

    function newNode(address nodeAddress, uint nodeData) public returns(bool success) {
      if(isNode(nodeAddress)) revert();
      nodeStructs[nodeAddress].nodeData = nodeData;
      nodeStructs[nodeAddress].listPointer = nodeList.push(nodeAddress) - 1;
      return true;
    }

    function updateNode(address nodeAddress, uint nodeData) public returns(bool success) {
      if(!isNode(nodeAddress)) revert();
      nodeStructs[nodeAddress].nodeData = nodeData;
      return true;
    }

    function deleteNode(address nodeAddress) public returns(bool success) {
      if(!isNode(nodeAddress)) revert();
      uint rowToDelete = nodeStructs[nodeAddress].listPointer;
      address keyToMove   = nodeList[nodeList.length-1];
      nodeList[rowToDelete] = keyToMove;
      nodeStructs[keyToMove].listPointer = rowToDelete;
      nodeList.length--;
      return true;
    }
}
