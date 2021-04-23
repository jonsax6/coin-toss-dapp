import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ETHER_ADDRESS, GREEN, RED, ether, tokens, formatBalance } from '../helpers'
import moment from 'moment'
import Spinner from './Spinner'

export default function BetItem({bet}) {
  const web3 = useSelector((state) => state.web3.connection)
  const account = useSelector((state) => state.web3.account)
  
  let rawBet = bet.betAmount
  let ethBet = ether(rawBet)
  let outcome = bet.outcome
  let username = bet.username
  let timestamp = moment.unix(bet.timestamp).format('h:mm:ss a M/D')
  
  return (
      <tr className={`order-${bet.timestamp}`} key={bet.index}>
        <td className="text-muted">{timestamp}</td>
        <td>{username}</td>
        <td className={outcome === 'win' ? `text-${GREEN}` : `text-${RED}`}>{ethBet}</td>
        <td className={outcome === 'win' ? `text-${GREEN}` : `text-${RED}`}>{outcome}</td>
      </tr>
  )
}
