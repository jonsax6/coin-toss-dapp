import React, { Component } from 'react'
import { connect } from 'react-redux'
import Balance from './Balance'
import { coinFlipSelector } from '../store/selectors'
import { subscribeToEvents } from '../store/interactions'


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
          <div className="card bg-dark text-white">
            <div className="card-header">
              Toss A Coin
            </div>
            <div className="card-body">
              <p className="card-text">Set your bet here!  If you get heads, double your money!  Tails?  hm... Well you know...</p>
              <a href="/#" className="card-link">Card link</a>
            </div>
          </div>
        </div>
        <div className="vertical-split">
          <div className="card bg-dark text-white">
            <div className="card-header">
              Card 3
            </div>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/#" className="card-link">Card link</a>
            </div>
          </div>
          <div className="card bg-dark text-white">
            <div className="card-header">
              Card 4
            </div>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/#" className="card-link">Card link</a>
            </div>
          </div>
        </div>
        <div className="vertical">
          <div className="card bg-dark text-white">
            <div className="card-header">
              Card 5
            </div>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/#" className="card-link">Card link</a>
            </div>
          </div>
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
