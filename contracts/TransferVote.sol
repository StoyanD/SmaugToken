pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract TransferVote is Ownable{
  uint duration;
  uint startTimestamp;

  function TransferVote(uint _duration){
    startTimestamp = now;
    duration = _duration;
  }
}
