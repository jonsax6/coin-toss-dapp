import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import Treasury from './Treasury'
import { Tabs, Tab, Button } from 'react-bootstrap'
import { loadBalances, depositEther, withdrawEther } from '../store/interactions'
import {
  accountSelector,
  coinFlipSelector,
  web3Selector,
  etherBalanceSelector,
  coinFlipEtherBalanceSelector,
  balanceLoadingSelector,
  etherDepositAmountSelector,
  etherWithdrawAmountSelector
} from '../store/selectors'
import { etherDepositAmountChanged, etherWithdrawAmountChanged } from '../store/actions'

const showForm = (props) => {
  const {
    dispatch,
    account,
    coinFlip,
    web3,
    etherBalance,
    coinFlipEtherBalance,
    etherDepositAmount,
    etherWithdrawAmount
  } = props

  return(
    <Tabs defaultActiveKey="deposit" className="bg-dark text-white">
      <Tab eventKey="deposit" title="Deposit" className="bg-dark">
        <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>CoinFlip Account</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>{etherBalance}</td>
              <td>{coinFlipEtherBalance}</td>
            </tr>
          </tbody>
        </table>
        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          depositEther(dispatch, coinFlip, web3, etherDepositAmount, account)
          console.log("form submitting...")
        }}>
          <div className="col-12 col-sm pr-sm-2">
            <input
              type="text"
              placeholder="ETH Amount"
              onChange={(e) => dispatch( etherDepositAmountChanged(e.target.value) )}
              className="form-control form-control-sm bg-dark text-white"
              required />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <Button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</Button>
          </div>
        </form>
      </Tab>
      <Tab eventKey="withdraw" title="Withdraw" className="bg-dark">
        <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>CoinFlip Account</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>{etherBalance}</td>
              <td>{coinFlipEtherBalance}</td>
            </tr>
          </tbody>
        </table>
        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          withdrawEther(dispatch, coinFlip, web3, etherWithdrawAmount, account)
          console.log("form submitting...")
        }}>
          <div className="col-12 col-sm pr-sm-2">
            <input
              type="text"
              placeholder="ETH Amount"
              onChange={(e) => dispatch( etherWithdrawAmountChanged(e.target.value) )}
              className="form-control form-control-sm bg-dark text-white"
              required />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <Button type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</Button>
          </div>
        </form>
      </Tab>
      <Treasury />
    </Tabs>
  )
}

class Balance extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const { dispatch, web3, coinFlip, account } = this.props
    await loadBalances(dispatch, web3, coinFlip, account)
  }
  render() {
    return(
      <div className="card bg-dark text-white">
        <div className="card-header">
          Balance
        </div>
        <div className="card-body">
        {this.props.showForm ? showForm(this.props) : <Spinner />}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const balanceLoading = balanceLoadingSelector(state)
  return {
    account: accountSelector(state),
    coinFlip: coinFlipSelector(state),
    web3: web3Selector(state),
    etherBalance: etherBalanceSelector(state),
    coinFlipEtherBalance: coinFlipEtherBalanceSelector(state),
    balanceLoading,
    showForm: !balanceLoading,
    etherDepositAmount: etherDepositAmountSelector(state),
    etherWithdrawAmount: etherWithdrawAmountSelector(state),
  }
}

export default connect(mapStateToProps)(Balance)