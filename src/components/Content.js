import React, { Component } from 'react'
import { connect } from 'react-redux'
import Balance from './Balance'
import { coinFlipSelector } from '../store/selectors'
import { subscribeToEvents } from '../store/interactions'
import CoinFlip from './CoinFlip'
import BetHistory from './BetHistory'


class Content extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {
    const { dispatch, coinFlip } = props
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
    coinFlip: coinFlipSelector(state)
  }
}

export default connect(mapStateToProps)(Content)
