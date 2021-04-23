import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs, Tab, Button } from 'react-bootstrap'
import { fundTreasury, withdrawTreasury, loadTreasury, loadCoinFlip } from '../store/interactions'

export default function Treasury() {
  const dispatch = useDispatch()
  const web3 = useSelector((state) => state.web3.connection)
  const coinFlip = useSelector((state) => state.coinFlip.contract)
  const account = useSelector((state) => state.web3.account)
  const treasury = useSelector((state) => state.coinFlip.treasuryBalance)
  const treasuryWei = useSelector((state) => state.coinFlip.treasuryBalance.balance)
  const treasuryEth = web3.utils.fromWei(treasuryWei.toString(), 'ether')
  const owner = "0xE47049d21487336a321f0A8a3E09f44dE25A4c94"
  
  // const [treasuryForDisplay, setTreasuryForDisplay] = useState([])

  useEffect(() => {
    console.log(treasury)
  }, [])
  
  const [amount, setAmount] = useState(0)
  useEffect(() => {
    console.log(account, amount)
    }, [account, amount])

  // useEffect(() => {
  //   if(treasuryWei === undefined) {
  //     console.log("treasury not found")
  //   } else {
  //     setTreasuryForDisplay(treasury.balance)
  //   }
  // }, [treasuryWei])

  return (
    // (account == owner) ? showForm() : null
    // showForm()
    <div>
      <table className="table table-dark table-sm small">
        <thead>
          <tr>
            <th>Token</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ETH</td>
            <td>{treasuryEth}</td>
          </tr>
        </tbody>
      </table>
      <form className="row" onSubmit={(event) => {
          event.preventDefault()
          fundTreasury(dispatch, coinFlip, web3, amount, account)
          console.log("form submitting...")
        }}>
        <div className="col-12 col-sm pr-sm-2">
          <input 
              type='text'
              placeholder="Fund Treasury (ETH)"
              className="form-control form-control-sm bg-dark text-white"
              onChange = {(e)=>{setAmount(e.target.value)}}
              required />
        </div>
        <div className="col-12 col-sm-auto pl-sm-0">
          <Button type="submit" className="btn btn-primary btn-block btn-sm">Fund Treasury</Button>
        </div>
      </form>
      <div className="row ">
        <div className="col-12 col-sm pr-sm-2">&nbsp;</div>
      </div>
      <form className="row" onSubmit={(event) => {
          event.preventDefault()
          withdrawTreasury(dispatch, coinFlip, web3, amount, account)
          console.log("form submitting...")
        }}>
        <div className="col-12 col-sm pr-sm-2">
        <input 
            type='text'
            placeholder="Withdraw Funds (ETH)"
            className="form-control form-control-sm bg-dark text-white"
            onChange = {(e)=>{setAmount(e.target.value)}}
            required />
        </div>
        <div className="col-12 col-sm-auto bt-3 pl-sm-0">
          <Button type="submit" className="btn btn-primary btn-block btn-sm">Defund Treasury</Button>
        </div>
      </form>
    </div>
  )
}
