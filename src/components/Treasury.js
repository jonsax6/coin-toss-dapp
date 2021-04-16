import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs, Tab, Button } from 'react-bootstrap'
import { fundTreasury } from '../store/interactions'

export default function Treasury() {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.web3.account)
  const treasury = useSelector((state) => state.coinFlip.contract.methods.treasury)
  console.log(treasury)
  const coinFlip = useSelector((state) => state.coinFlip.contract)
  const web3 = useSelector((state) => state.web3.connection)
  const owner = "0xE47049d21487336a321f0A8a3E09f44dE25A4c94"
  
  const [amount, setAmount] = useState(0)
  useEffect(() => {
    console.log(account, amount)
    }, [account, amount])

  // const showForm = () => {
  //   <div>
  //     <table className="table table-dark table-sm small">
  //       <thead>
  //         <tr>
  //           <th>Token</th>
  //           <th>Balance</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>
  //           <td>ETH</td>
  //           <td>{treasury}</td>
  //         </tr>
  //       </tbody>
  //     </table>
  //     <form className="row" onSubmit={(event) => {
  //         event.preventDefault()
  //         fundTreasury(dispatch, coinFlip, web3, amount, account)
  //         console.log("form submitting...")
  //       }}>
  //         <div className="col-12 col-sm pr-sm-2">
  //           <input 
  //               type='text'
  //               placeholder="Fund Treasury (ETH)"
  //               className="form-control form-control-sm bg-dark text-white"
  //               onChange = {(e)=>{setAmount(e.target.value)}}
  //               required />
  //         </div>
  //         <div className="col-12 col-sm-auto pl-sm-0">
  //           <Button type="submit" className="btn btn-primary btn-block btn-sm">Fund Treasury</Button>
  //         </div>
  //       </form>
  //   </div>
  // 
  // }

  return (
    // (account == owner) ? showForm() : null
    // showForm()
    <Tab eventKey="treasury" title="Treasury" className="bg-dark">        
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
            <td>{treasury}</td>
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
    </Tab>
  )
}
