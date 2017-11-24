pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract SmaugToken is StandardToken, Ownable{

  string public constant name = "SmaugToken";
  string public constant symbol = "SMG";
  uint8 public constant decimals = 18;
  uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

  modifier validAddresses(address[] addressArr){
    for(uint i = 0; i < addressArr; i++){
      require(addressArr[i] != address(0));
    }
    _;
  }

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  function SmaugToken() {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

  function adminTransfer(address from, address to, uint256 _value) public onlyOwner validAddress([from,to]) returns (bool) {
    // SafeMath.sub will throw if there is not enough balance.
    balances[from] = balances[from].sub(_value);
    balances[to] = balances[to].add(_value);
    Transfer(from, to, _value);
    return true;
  }


}
