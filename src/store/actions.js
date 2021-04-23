// WEB3
export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function web3AccountLoaded(account) {
  return {
    type: 'WEB3_ACCOUNT_LOADED',
    account
  }
}

// coinFlip contract
export function coinFlipLoaded(contract) {
  return {
    type: 'COINFLIP_LOADED',
    contract
  }
}

export function treasuryFunded(amount) {
  return {
    type: 'TREASURY_FUNDED',
    amount
  }
}

export function usernameAdding() {
  return {
    type: 'NAME_ADDING',
  }
}

export function usernameAdded(username) {
  return {
    type: 'USERNAME_ADDED',
    username
  }
}

export function usernameChanged(username) {
  return {
    type: 'USERNAME_CHANGED',
    username
  }
}

export function usernameLoaded(username) {
  return {
    type: 'USERNAME_LOADED',
    username
  }
}

export function betExecuting() {
  return {
    type: 'BET_EXECUTING',
  }
}

export function betExecuted() {
    return {
      type: 'BET_EXECUTED',
    }
}

export function betAmountChanged(amount) {
  return {
    type: 'BET_AMOUNT_CHANGED',
    amount
  }
}

export function betsLoading() {
  return {
    type: 'BETS_LOADING'
  }
}

export function betsLoaded(bets) {
  return {
    type: 'ALL_BETS_LOADED',
    bets
  }
}

export function allDepositsLoading() {
  return {
    type: 'ALL_DEPOSTS_LOADING',
  }
}

export function allDepositsLoaded(allDeposits) {
  return {
    type: 'ALL_DEPOSITS_LOADED',
    allDeposits
  }
}

// Balances
export function etherBalanceLoaded(balance) {
  return {
    type: 'ETHER_BALANCE_LOADED',
    balance
  }
}

export function balanceLoaded() {
  return {
    type: 'BALANCE_LOADED'
  }
}

export function balanceLoading() {
  return {
    type: 'BALANCE_LOADING'
  }
}

export function treasuryBalanceLoading() {
  return {
    type: 'TREASURY_BALANCE_LOADING'
  }
}

export function treasuryBalanceLoaded(balance) {
  return {
    type: 'TREASURY_BALANCE_LOADED',
    balance
  }
}

export function coinFlipEtherBalanceLoaded(balance) {
  return {
    type: 'COINFLIP_ETHER_BALANCE_LOADED',
    balance
  }
}

export function etherDepositAmountChanged(amount) {
  return {
    type: 'ETHER_DEPOSIT_AMOUNT_CHANGED',
    amount
  }
}

export function etherWithdrawAmountChanged(amount) {
  return {
    type: 'ETHER_WITHDRAW_AMOUNT_CHANGED',
    amount
  }
}


