import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from './Spinner'
import CoinSpinner from './CoinSpinner'
import { Tabs, Tab, Button } from 'react-bootstrap'
import { loadBalances, flipCoin, withdrawEther, loadAllBets, addName } from '../store/interactions'
import {
  accountSelector,
  coinFlipSelector,
  web3Selector,
  coinFlipEtherBalanceSelector,
  balanceLoadingSelector
} from '../store/selectors'
import { betAmountChanged, etherDepositAmountChanged, etherWithdrawAmountChanged, betExecuted } from '../store/actions'



export default function CoinFlip() {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.web3.account)
  const coinFlip = useSelector((state) => state.coinFlip.contract)
  const betExecuting = useSelector((state) => state.coinFlip.betExecuting)
  const web3 = useSelector((state) => state.web3.connection)
  const [amount, setAmount] = useState(0)
  const [username, setUsername] = useState('')
  const [flipped, setFlipped] = useState(false)

  // just to make sure bets are loaded into state on page load
  useEffect(() => {
    loadAllBets(coinFlip, dispatch)
    console.log("loaded bets...")
  }, [])

  const initFlip = async () => {
    setFlipped(false)
    await flipCoin(dispatch, coinFlip, web3, amount, account)
  }

  useEffect(() => {
    loadBalances(dispatch, web3, coinFlip, account)
  }, [betExecuting])

    return(
      <div className="card bg-dark text-white">
        <div className="card-header">
          Toss A Coin
        </div>
        <div className="card-body">
          {/* {showForm()} */}
        {!betExecuting 
        ? 
        <div className="card bg-dark text-white">
          <form className="row" onSubmit={(event) => {
            event.preventDefault()
            initFlip()
            betExecuted()
            }}>
            <div className="col-12 col-sm pr-sm-2">
              <input 
                  type='text'
                  placeholder="bet amount (ETH)"
                  // value={amount}
                  className="form-control form-control-sm bg-dark text-white"
                  // onChange={(e) => dispatch( betAmountChanged(e.target.value) )}
                  onChange = {(e)=>{setAmount(e.target.value)}}
                  required />
            </div>
            <div className="col-12 col-sm-auto pl-sm-0">
              <Button type="submit" className="btn btn-primary btn-block btn-sm">
                Place Your Bet
              </Button>
            </div>
          </form>
      </div> 
      : 
      <div className="box">
        <CoinSpinner />
      </div>}
        </div>
      </div>
    )
}
