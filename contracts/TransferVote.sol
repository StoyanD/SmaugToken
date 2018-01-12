pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './HoardNodes.sol';
import './SmaugToken.sol';

contract TransferVote is Ownable{
  uint duration;
  uint startTimestamp; //10 min timeout
  HoardNodes hoardNodes;
  SmaugToken smaugToken;
  uint totalTokens;
  uint votesFor;

  mapping(address => uint) public balances;

  event TransferVoteEvent(address indexed voteContract, address indexed from, address indexed to);
  event TransferVoteResultEvent(address indexed voteContract, bool indexed successful);

  modifier isHoardNode(address _address){
    require(hoardNodes.isNode(_address));
    _;
  }

  modifier canVote(address _address){
    require(balances[_address] > 0);
    _;
  }

  function TransferVote(uint _duration, address _from, address _to, HoardNodes nodes){
    startTimestamp = now;
    duration = _duration;
    hoardNodes = nodes;
    smaugToken = SmaugToken(msg.sender);
    mapNodeBalances();
    TransferVoteEvent(this, _from, _to);
  }

  function vote(bool voteFor) public isHoardNode(msg.sender) canVote(msg.sender){
    if(voteFor){
      votesFor += balances[msg.sender];
    }
    balances[msg.sender] = 0;
  }

  function mapNodeBalances() private {
    for (uint i = 0; i < hoardNodes.getNodeCount(); i++){
      uint tokens = smaugToken.balanceOf(hoardNodes.getNodeAddressAt(i));
      totalTokens += tokens;
      balances[hoardNodes.getNodeAddressAt(i)] = tokens;
    }
  }

}
