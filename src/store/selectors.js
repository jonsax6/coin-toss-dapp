import { get } from 'lodash'
import { createSelector } from 'reselect'
import { formatBalance } from '../helpers'

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

const web3 = state => get(state, 'web3.connection')
export const web3Selector = createSelector(web3, w => w)

const coinFlip = state => get(state, 'coinFlip.contract')
export const coinFlipSelector = createSelector(coinFlip, cf => cf)

const coinFlipLoaded = state => get(state, 'coinFlip.loaded', false)
export const coinFlipLoadedSelector = createSelector(coinFlipLoaded, cfl => cfl)

// BALANCES
const balanceLoading = state => get(state, 'coinFlip.balanceLoading', true)
export const balanceLoadingSelector = createSelector(balanceLoading, status => status)

const etherBalance = state => get(state, 'web3.balance', 0)
export const etherBalanceSelector = createSelector(
  etherBalance,
  (balance) => {
    if(balance === 0){
      return balance
    } 
    else {
      return formatBalance(balance)
    }
  }
)

const coinFlipEtherBalance = state => get(state, 'coinFlip.etherBalance', 0)
export const coinFlipEtherBalanceSelector = createSelector(
  coinFlipEtherBalance,
  (balance) => {
    if(balance === 0){
      return balance
    } 
    else {
     return formatBalance(balance)
    }
  }
)

const etherDepositAmount = state => get(state, 'coinFlip.etherDepositAmount', null)
export const etherDepositAmountSelector = createSelector(etherDepositAmount, amount => amount)

const etherWithdrawAmount = state => get(state, 'coinFlip.etherWithdrawAmount', null)
export const etherWithdrawAmountSelector = createSelector(etherWithdrawAmount, amount => amount)