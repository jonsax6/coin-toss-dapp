import React, { Component } from 'react'
import { connect } from 'react-redux'
import CoinSpinner from './CoinSpinner'
import Treasury from './Treasury'
import { Tabs, Tab, Button } from 'react-bootstrap'
import { loadBalances, depositEther, withdrawEther, addUsername, loadUsername } from '../store/interactions'
import {
  accountSelector,
  coinFlipSelector,
  web3Selector,
  usernameSelector,
  etherBalanceSelector,
  coinFlipEtherBalanceSelector,
  balanceLoadingSelector,
  etherDepositAmountSelector,
  etherWithdrawAmountSelector,
  betExecutingSelector
} from '../store/selectors'
import { etherDepositAmountChanged, etherWithdrawAmountChanged, usernameChanged } from '../store/actions'

const showForm = (props) => {
  // change to hooks when transforming to rfc-hooks
  const {
    dispatch,
    account,
    coinFlip,
    web3,
    username,
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
          addUsername(dispatch, coinFlip, username, account)
          console.log("adding username...")
          }}>
          <div className="col-12 col-sm pr-sm-2">
            <input 
              type='text'
              placeholder="choose a username..."
              className="form-control form-control-sm bg-dark text-white"
              onChange = {(e) => dispatch( usernameChanged(e.target.value) )}
              required />
          </div>
          <div className="col-12 col-sm-auto bt-3 pl-sm-0">
            <Button type="submit" className="btn btn-primary btn-block btn-sm">Add Username</Button>
          </div>
        </form>
          <div className="row ">
            <div className="col-12 col-sm pr-sm-2">&nbsp;</div>
          </div>

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
      {account === "0xE47049d21487336a321f0A8a3E09f44dE25A4c94" ? <Tab eventKey="treasury" title="Treasury" className="bg-dark">        
        <Treasury />
      </Tab> : <></> }
    </Tabs>
  )
}

class Balance extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  // replace with useEffects
  async loadBlockchainData() {
    const { dispatch, web3, coinFlip, account, username } = this.props
    await loadBalances(dispatch, web3, coinFlip, account)
    await loadUsername(dispatch, coinFlip, account)
  }
  render() {
    return(
      <div className="card bg-dark text-white">
        <div className="card-header">
          Balance
        </div>
        <div className="card-body">
        {this.props.showFormBal && this.props.showFormBet ? showForm(this.props) : <CoinSpinner />}
        </div>
      </div>
    )
  }
}

// switching to useselector, below goes away
function mapStateToProps(state) {
  const balanceLoading = balanceLoadingSelector(state)
  const betExecuting = betExecutingSelector(state)
  return {
    account: accountSelector(state),
    coinFlip: coinFlipSelector(state),
    web3: web3Selector(state),
    username: usernameSelector(state),
    etherBalance: etherBalanceSelector(state),
    coinFlipEtherBalance: coinFlipEtherBalanceSelector(state),
    balanceLoading,
    betExecuting,
    showFormBal: !balanceLoading,
    showFormBet: !betExecuting,
    etherDepositAmount: etherDepositAmountSelector(state),
    etherWithdrawAmount: etherWithdrawAmountSelector(state)
  }
}

// after switch to rfc, export happens at rfc declaration (so delete this)
export default connect(mapStateToProps)(Balance)