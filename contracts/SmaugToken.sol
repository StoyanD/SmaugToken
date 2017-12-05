pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

import './TransferVote.sol';

contract SmaugToken is StandardToken, Ownable{

  string public constant name = "SmaugToken";
  string public constant symbol = "SMG";
  uint8 public constant decimals = 18;
  uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

  mapping(address ->  TransferVote) public transferContracts;

  modifier validAddress(address _address){
    require(_address != address(0));
    _;
  }

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  function SmaugToken() {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

  function adminTransfer(address _from, address _to, uint256 _value) public onlyOwner validAddress(_from) validAddress(_to) returns (bool) {
    // SafeMath.sub will throw if there is not enough balance.
    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(_value);
    Transfer(_from, _to, _value);
    return true;
  }

  function createVoteTransfer(address _from, address _to, uint256 _value) public validAddress(_from) validAddress(_to) returns (address) {
    TransferVote tv = new TransferVote(200);
    transferContracts[someFunc(_from, _to)](tv);
    return tv;
  }

  function voteTransfer(address _from, address _to, uint256 _value) public validAddress(_from) validAddress(_to) returns (bool) {

  }

}
