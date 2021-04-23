import React, { useState, useEffect } from 'react'
import BetItem from './BetItem'
import { useSelector, useDispatch } from 'react-redux'
import CoinSpinner from './CoinSpinner'



export default function BetHistory() {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.web3.account)
  const coinFlip = useSelector((state) => state.coinFlip.contract)
  const web3 = useSelector((state) => state.web3)
  const bets = useSelector((state) => state.coinFlip.bets)
  const betExecuting = useSelector((state) => state.coinFlip.betExecuting)
  
  const [betsForDisplay, setBetsForDisplay] = useState({})

  useEffect(() => {
    console.log(betsForDisplay)
  }, [betsForDisplay])

  useEffect(() => {
    if(bets === undefined || bets === [] || bets === { loaded: true, data: {} || bets === []}) {
      console.log("No bets to display yet, place a bet!")
    } else {
      console.log(bets.data)
      setBetsForDisplay(bets.data)
    }
  }, [bets])



  return (
    <div className="card bg-dark text-white">
      <div className="card-header">
        Leaderboard
      </div>
      <div className="card-body">
      <table className="table table-dark table-sm small">
        <thead>
          <tr>
            <th>Time</th>
            <th>Username</th>
            <th>Bet</th>
            <th>Outcome</th>
          </tr>
        </thead>
        {/* { <CoinSpinner />} */}
        {/* {betsForDisplay != [] && !betExecuting && betsForDisplay != undefined} */}
          { betsForDisplay !== [] && !betExecuting && betsForDisplay === {}
          ?
          betsForDisplay.map((bet) => <BetItem bet={bet} key={bet.timestamp}/> )
          :
          <CoinSpinner />
          }    
        </table>  
      </div>
    </div>
  )
}
