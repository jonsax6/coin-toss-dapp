import React, { Component } from 'react'
import { connect } from 'react-redux'
import BetItem from './BetItem'
import CoinSpinner from './CoinSpinner'
import {
  accountSelector,
  coinFlipSelector,
  web3Selector,
  betsSelector,
  betExecutingSelector,
  betsLoadingSelector,
  balanceLoadingSelector
} from '../store/selectors'
import { loadAllBets, loadBalances } from '../store/interactions'

class BetHistory extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const { dispatch, web3, coinFlip, account } = this.props
    await loadBalances(dispatch, web3, coinFlip, account)
    await loadAllBets(coinFlip, dispatch)
  }

  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          Leaderboard
        </div>
        <div className="card-body">
          { console.log(this.props.balanceLoading) }
          { console.log(this.props.betExecuting) }
          { console.log(this.props.betsLoading) }
          { console.log(this.props.bets) }
          { !this.props.balanceLoading && !this.props.betExecuting && !this.props.betsLoading
          ?
          <table className="table table-dark table-sm small">
            <thead>
              <tr>
                <th>Time</th>
                <th>Username</th>
                <th>Bet</th>
                <th>Outcome</th>
              </tr>
            </thead>
            { this.props.bets.map((bet) => <BetItem bet={bet} key={bet.timestamp}/>)}
            </table>  
          :
          <CoinSpinner /> }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const balanceLoading = balanceLoadingSelector(state)
  const betsLoading = betsLoadingSelector(state)
  const betExecuting = betExecutingSelector(state)
  return {
    account: accountSelector(state),
    coinFlip: coinFlipSelector(state),
    web3: web3Selector(state),
    bets: betsSelector(state),
    balanceLoading,
    betExecuting,
    betsLoading,
    showFormBal: !balanceLoading,
    showFormBet: !betExecuting 
  }
}

export default connect(mapStateToProps)(BetHistory)