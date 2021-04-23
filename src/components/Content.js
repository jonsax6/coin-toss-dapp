import React, { Component } from 'react'
import { connect } from 'react-redux'
import Balance from './Balance'
import { coinFlipSelector, accountSelector, web3Selector } from '../store/selectors'
import { subscribeToEvents, loadBalances } from '../store/interactions'
import CoinFlip from './CoinFlip'
import BetHistory from './BetHistory'


class Content extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {
    const { dispatch, web3, coinFlip, account } = props
    await subscribeToEvents(coinFlip, dispatch)
  }

  render() {
    return (
      <div className="content">
        <div className="vertical">
          <Balance />
        </div>
        <div className="vertical">
          <CoinFlip />
        </div>
        <div className="vertical">
          <BetHistory />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    coinFlip: coinFlipSelector(state),
    account: accountSelector(state),
    web3: web3Selector(state)
  }
}

export default connect(mapStateToProps)(Content)
