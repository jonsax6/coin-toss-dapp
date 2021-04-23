import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from './Spinner'
import Treasury from './Treasury'
import { Tabs, Tab, Button } from 'react-bootstrap'
import { loadBalances, depositEther, withdrawEther, addUsername, getUsername } from '../store/interactions'
import { etherWithdrawAmountChanged, balanceLoaded } from '../store/actions'
import { ETHER_ADDRESS, GREEN, RED, ether, tokens, formatBalance } from '../helpers'

export default function Balance() {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.web3.account)
  const coinFlip = useSelector((state) => state.coinFlip.contract)
  const userList = useSelector((state) => state.coinFlip.userList)
  const web3 = useSelector((state) => state.web3.connection)
  const etherBalanceRaw = useSelector((state) => state.web3.balance)
  const etherBalance = formatBalance(etherBalanceRaw)
  const coinFlipEtherBalanceRaw = useSelector((state) => state.coinFlip.etherBalance)
  const coinFlipEtherBalance = formatBalance(coinFlipEtherBalanceRaw)
  const balanceLoading = useSelector((state) => state.coinFlip.balanceLoading)
  const showForm = !balanceLoading
  // const etherDepositAmount = useSelector((state) => state.coinFlip.etherDepositAmount)
  // const etherWithdrawAmount = useSelector((state) => state.coinFlip.etherWithdrawAmount)
  const [etherDepositAmount, setEtherDepositAmount] = useState(0)
  const [etherWithdrawAmount, setEtherWithdrawAmount] = useState(0)
  const [username, setUsername] = useState('')

  useEffect(() => {
    loadBalances(dispatch, web3, coinFlip, account)
  }, [])

  useEffect(() => {
    loadUsername(dispatch, coinFlip, account)
  }, [])

  useEffect(() => {
    getUsername(dispatch, coinFlip, account)
  }, [])

  useEffect(() => {
    console.log(etherDepositAmount)
  }, [etherDepositAmount])

  useEffect(() => {
    console.log(etherWithdrawAmount)
  }, [etherWithdrawAmount])

  useEffect(() => {
    console.log(username)
  }, [username])

  useEffect(() => {
    console.log(userList)
  }, [userList])

  return(
    <div className="card bg-dark text-white">
      <div className="card-header">
        Balance
      </div>
      <div className="card-body">
        {showForm 
        ?
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
                onChange = {(e) => {setUsername(e.target.value)}}
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
                onChange={(e) => {setEtherDepositAmount(e.target.value)}}
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
                onChange={(e) => {setEtherWithdrawAmount(e.target.value)}}
                className="form-control form-control-sm bg-dark text-white"
                required />
            </div>
            <div className="col-12 col-sm-auto pl-sm-0">
              <Button type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</Button>
            </div>
          </form>
          </Tab>
          {account === "0xE47049d21487336a321f0A8a3E09f44dE25A4c94" 
          ? 
          <Tab eventKey="treasury" title="Treasury" className="bg-dark">        
            <Treasury />
          </Tab> : <></> }
        </Tabs>
        : 
        <Spinner />}
      </div>
    </div>
  )
}
