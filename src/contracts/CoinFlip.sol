pragma solidity ^0.5.12;

import "./Ownable.sol";

import "node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

// Contract executes the following:
// Allows for ETH deposits
// Allows for ETH withdrawals
// Generates a random number 1 or 0 with 50/50 probability
// Executes a simulated coin flip, adding 100% of wager to balance if won, or deducting 100% of wager if lost
// emits Deposit, Withdrawal and Flip events

contract CoinFlip is Ownable {
  using SafeMath for uint;
  // Variables
  uint public balance;
  uint public bet;
  uint public treasury;
  uint public allPlayersBalance;

  constructor() public payable {
    uint initFund = msg.value;
    treasury = treasury.add(initFund);
    assert(treasury == address(this).balance);
  }

  // mappings
  // Tracks the user balances stored in the contract
  mapping (address => uint) public playerBalances;
  mapping (address => string) public usernames;

  // players array
  address [] public players;

  // events
  event Deposit(address user, uint256 amount, uint256 balance, string username);
  event Withdraw(address user, uint256 withdrawAmount, uint256 currentBalance);
  event Bet(address user, string username, uint256 betAmount, string outcome, uint timestamp);
  event Fund(uint value);
  
  // structs
  struct _Bet {
    address account;
    string username;
    uint256 wagerAmount;
    string outcome;
    uint256 timestamp;
  }

  struct _Player {
    address account;
    string username;
  }
  
  // modifiers
  modifier costs(uint cost) {
    require(msg.value >= cost, "The minimum bet is 0.001 Ether.");
    _;
  }

  // functions

  // player deposits funds into contract for betting use
  function deposit() public payable returns(uint){
    string memory _username = usernames[msg.sender];
    playerBalances[msg.sender] = playerBalances[msg.sender].add(msg.value);
    allPlayersBalance = allPlayersBalance.add(msg.value);
    assert(treasury + allPlayersBalance == address(this).balance);
    emit Deposit(msg.sender, msg.value, playerBalances[msg.sender], _username);
    return playerBalances[msg.sender];
  }

  // owner funds the treasury balance
  function fundTreasury() public payable onlyOwner returns(uint) {
    require(msg.value != 0);
    treasury = treasury.add(msg.value);
    emit Fund(msg.value);
    assert(treasury + allPlayersBalance == address(this).balance);
    return msg.value;
  }

  // querries the player's available balance in the contract
  function playerBalance() public view returns (uint256){
    return playerBalances[msg.sender];
  }

  function getTreasuryBalance() public view returns (uint256) {
    return treasury;
  }

  function addUsername(string memory _username, address _user) public {
    usernames[_user] = _username;
  }

  function getUsername() public view returns (string memory) {
    return usernames[msg.sender];
  }

  // the total balance available in the contract treasury, these funds still belong to owner
  function getBalance() public view returns (address, uint) {
    return(address(this), treasury);
  }

  // the total funds in the contract, including all player funds + treasury funds
  function totalBalance() public view onlyOwner returns (address, uint) {
    assert(treasury + allPlayersBalance == address(this).balance);
    return(address(this), address(this).balance);
  }

  // only player can withdraw their own funds, contract owner cannot withdraw or transfer these funds
  function playerWithdraw(uint256 _amount) public {
    require(playerBalances[msg.sender] >= _amount);
    playerBalances[msg.sender] = playerBalances[msg.sender].sub(_amount);
    allPlayersBalance = allPlayersBalance.sub(_amount);
    msg.sender.transfer(_amount);
    assert(treasury + allPlayersBalance == address(this).balance);
    emit Withdraw(msg.sender, _amount, playerBalances[msg.sender]);
  }

  // only owner can withdraw the treasury funds
  function withdraw(uint _amount) public onlyOwner returns(uint) {
    require(_amount <= treasury);
    msg.sender.transfer(_amount);
    treasury = treasury.sub(_amount);
    assert(treasury + allPlayersBalance == address(this).balance);
  }
  
  function random() public view returns (uint) {
    return now % 2;
  }

  function coinFlip(uint _amount) public returns(string memory) {
    require(_amount <= playerBalances[msg.sender]);
    require(_amount <= treasury);

    string memory _username = usernames[msg.sender];
    uint256 randomNum = random();
    string memory outcome;

    if(randomNum == 1){
      outcome = "win";
      playerBalances[msg.sender] = playerBalances[msg.sender].add(_amount);
      allPlayersBalance = allPlayersBalance.add(_amount);
      treasury = treasury.sub(_amount);

    } else {
      outcome = "lose";
      playerBalances[msg.sender] = playerBalances[msg.sender].sub(_amount);
      allPlayersBalance = allPlayersBalance.sub(_amount);
      treasury = treasury.add(_amount);
    }

    assert(treasury + allPlayersBalance == address(this).balance);
    emit Bet(msg.sender, _username, _amount, outcome, now);
    return outcome;
  }
}
