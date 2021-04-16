import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from './Spinner'
import { Tabs, Tab, Button } from 'react-bootstrap'
import { loadBalances, flipCoin, withdrawEther } from '../store/interactions'
import {
  accountSelector,
  coinFlipSelector,
  web3Selector,
  coinFlipEtherBalanceSelector,
  balanceLoadingSelector
} from '../store/selectors'
import { betAmountChanged, etherDepositAmountChanged, etherWithdrawAmountChanged } from '../store/actions'

export default function CoinFlip() {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.web3.account)
  const coinFlip = useSelector((state) => state.coinFlip.contract)
  const betExecuting = useSelector((state) => state.coinFlip.betExecuting)
  const web3 = useSelector((state) => state.web3.connection)

  const [amount, setAmount] = useState(0)
  useEffect(() => {
    console.log(account, amount)
    }, [account, amount])
  
  const [coinFlipping, setFlipping] = useState(false)

  const initFlip = () => {
    setFlipping(true)
    flipCoin(dispatch, coinFlip, web3, amount, account)
    console.log("flipping now...")
    setFlipping(false)
  }

  useEffect(() => {
    console.log(coinFlipping)
    }, [coinFlipping])


  const showForm = () => {
    return(
      <div className="card bg-dark text-white">
        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          initFlip()
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
    )
  }
    return(
      <div className="card bg-dark text-white">
        <div className="card-header">
          Toss A Coin
        </div>
        <div className="card-body">
          {/* {showForm()} */}
        {!coinFlipping ? showForm() : <Spinner />}
        </div>
      </div>
    )
}
