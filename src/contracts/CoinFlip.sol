pragma solidity ^0.5.12;

import "node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

// Contract executes the following:
// Tracks the user balances stored in the contract
// Allows for ETH deposits
// Allows for ETH withdrawals
// Generates a random number 1 or 0 with 50/50 probability
// Executes a simulated coin flip, adding 100% of wager to balance if won, or deducting 100% of wager if lost
// emits Deposit, Withdrawal and Flip events

contract CoinFlip {
  using SafeMath for uint;
  // Variables
  // mappings
  mapping (address => uint256) public balances;

  // events
  event Deposit(address user, uint256 amount, uint256 balance);
  event Withdraw(address user, uint256 amount, uint256 balance);
  event Flip(address user, uint256 bet, bool outcome);
  // structs
  

  // functions
  function deposit() public payable {        
      balances[msg.sender] = balances[msg.sender].add(msg.value);
      emit Deposit(msg.sender, msg.value, balances[msg.sender]);
  }

  function balanceOf(address _user) public view returns (uint256){
      return balances[_user];
  }

  function withdraw(uint256 _amount) public payable {
      require(balances[msg.sender] >= _amount);
      balances[msg.sender] = balances[msg.sender].sub(_amount);
      msg.sender.transfer(_amount);
      emit Withdraw(msg.sender, _amount, balances[msg.sender]);
  }
  
  function random() public view returns (uint) {
    return now % 2;
  }

  function coinFlip(uint256 _amount) public {
    require(_amount >= balances[msg.sender]);
    uint256 randomNum = random();
    bool win = false;
    if(randomNum == 1) {
      win = true;
    } if(win) {
      balances[msg.sender] = balances[msg.sender].add(_amount);
    } else {
      balances[msg.sender] = balances[msg.sender].sub(_amount);
    }
    emit Flip(msg.sender, _amount, win);
  }
}