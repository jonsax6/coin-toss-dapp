import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import Navbar from './Navbar'
import Content from './Content'
import {
  loadWeb3,
  loadAccount,
  loadCoinFlip,
} from '../store/interactions'
import { coinFlipLoadedSelector } from '../store/selectors'

export default function App() {
  const dispatch = useDispatch()
  const web3 = loadWeb3(dispatch)
  const networkId = web3.eth.net.getId()

  useEffect(() => {
    loadAccount(web3, dispatch)
  }, [])

  useEffect((web3, networkId, dispatch) => {
    loadCoinFlip(web3, networkId, dispatch)
    return () => {
      contract
    }
  }, [])

  const coinFlipLoaded = useSelector((state) => state.coinFlip.loaded)

  useEffect((web3, networkId, dispatch) => {
    loadCoinFlip
  }, [])

  useEffect((dispatch, web3, coinFlip) => {
    loadAccount(web3, dispatch)
    if(!coinFlip) {
      window.alert('CoinFlip smart contract not detected on the current network. Please select another network with Metamask.')
      return
    }
  }, [])

  return (
    <div>
      <Navbar />
      { coinFlipLoaded ? <Content /> : <div className="content"></div> }
  </div>
  )
}
