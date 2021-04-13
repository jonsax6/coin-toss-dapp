import React, { Component, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from './Spinner'
import { Tabs, Tab, Button } from 'react-bootstrap'
import { loadBalances, flipCoin } from '../store/interactions'
import {
  accountSelector,
  coinFlipSelector,
  web3Selector,
  coinFlipEtherBalanceSelector,
  balanceLoadingSelector
} from '../store/selectors'
import { etherDepositAmountChanged, etherWithdrawAmountChanged } from '../store/actions'

export default function CoinFlip() {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.web3.account)
  const coinFlip = useSelector((state) => state.coinFlip.contract)

  const [amount, setAmount] = useState(0)
  useEffect(() => {
    console.log(account)
    }, [account, amount])

  return (
    <div className="card bg-dark text-white">
    <div className="card-header">
      Toss A Coin
    </div>
      <input 
        type='text'
        value={amount}
        onChange = {(e)=>{setAmount(e.target.value)}}
      >
      </input>  
    <button
      // onClick={()=>flipCoin()}
      onClick={()=>flipCoin(dispatch, coinFlip, amount, account)}
    >

      press me
    </button>
  </div>
  )
}
