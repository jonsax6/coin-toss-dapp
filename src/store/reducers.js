import { combineReducers } from 'redux';

function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state,  connection: action.connection }
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.account }
    case 'ETHER_BALANCE_LOADED':
      return { ...state, balance: action.balance}
    default:
      return state
  }
}

function coinFlip(state = {}, action) {
  switch (action.type) {
    case 'COINFLIP_LOADED':
      return { ...state, loaded: true, contract: action.contract, username: "", betsLoading: false, betExecuting: false, bets: { loaded: true, data: {} }}
    case 'TREASURY_FUNDED':
      return { ...state, treasuryBalance: { ...state.treasuryBalance, funded: true }}
    case 'USERNAME_ADDING':
      return { ...state, usernameAdding: true }
    case 'USERNAME_ADDED':
      return { ...state, username: action.username, usernameAdding: false }
    case 'USERNAME_CHANGED':
      return { ...state, username: action.username }
    case 'USERNAME_LOADED':
      return { ...state, username: action.username }
    case 'COINFLIP_ETHER_BALANCE_LOADED':
      return { ...state, etherBalance: action.balance } 
    case 'ETHER_DEPOSIT_AMOUNT_CHANGED':
      return { ...state, etherDepositAmount: action.amount }
    case 'ETHER_WITHDRAW_AMOUNT_CHANGED':
      return { ...state, etherWithdrawAmount: action.amount }
    case 'BALANCE_LOADING':
      return { ...state, balanceLoading: true }
    case 'BALANCE_LOADED':
      return { ...state, balanceLoading: false }
    case 'TREASURY_BALANCE_LOADING':
      return { ...state, treasuryBalance: { loaded: false }}
    case 'TREASURY_BALANCE_LOADED':
      return { ...state, treasuryBalance: { loaded: true, balance: action.balance }}
    case 'BET_EXECUTING':
      return { ...state, betExecuting: true }
    case 'BET_EXECUTED':
      return { ...state, betExecuting: false }
    case 'BETS_LOADING':
      return { ...state, betsLoading: true }
    case 'BETS_LOADED':
      return { ...state, betsLoading: false }
    case 'ALL_BETS_LOADING':
      return { ...state, betsLoading: true }
    case 'ALL_BETS_LOADED':
      return { ...state, betsLoading: false, bets: { loaded: true, data: action.bets }}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  web3,
  coinFlip
})

export default rootReducer
