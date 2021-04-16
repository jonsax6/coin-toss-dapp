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
      return { ...state, loaded: true, contract: action.contract }
    case 'TREASURY_FUNDED':
      return { ...state, funded: true, contract: action.amount }
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
    case 'BET_EXECUTING':
      return { ...state, betExecuting: true }
    case 'BET_EXECUTED':
      return { ...state, betExecuting: false }
    case 'BET_FAILED':
      return { ...state, betExecuting: false }
    case 'BETS_LOADING':
      return { ...state, betsLoading: true }
    case 'BETS_LOADED':
      return { ...state, bets: { loaded: true, data: action.bets}}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  web3,
  coinFlip
})

export default rootReducer
