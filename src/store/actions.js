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

export function betExecuting() {
  return {
    type: 'BET_EXECUTING',
  }
}

export function betExecuted(input) {
  if(input == "success") {
    return {
      type: 'BET_EXECUTED',
    }
  } else {
    return {
      type: 'BET_FAILED',
    }
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
    type: 'BETS_LOADED',
    bets
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


