import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadAllBets } from '../store/interactions'



export default function BetHistory() {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.web3.account)
  const coinFlip = useSelector((state) => state.coinFlip.contract)
  const web3 = useSelector((state) => state.web3)


  return (
    <div className="card bg-dark text-white">
      <div className="card-header">
        Your Filled Bets
      </div>
      <div className="card-body">
        Content here...
      </div>
    </div>
  )
}
