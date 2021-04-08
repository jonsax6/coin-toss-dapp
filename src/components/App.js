import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Navbar from './Navbar'
import Content from './Content'
import {
  loadWeb3,
  loadAccount,
  loadCoinFlip,
} from '../store/interactions'
import { coinFlipLoadedSelector } from '../store/selectors'


class App extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    const web3 = await loadWeb3(dispatch)
    const networkId = await web3.eth.net.getId()
    await loadAccount(web3, dispatch)

    const coinFlip = await loadCoinFlip(web3, networkId, dispatch)
    if(!coinFlip) {
      window.alert('CoinFlip smart contract not detected on the current network. Please select another network with Metamask.')
      return
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        { this.props.coinFlipLoaded ? <Content /> : <div className="content"></div> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    coinFlipLoaded: coinFlipLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(App)
