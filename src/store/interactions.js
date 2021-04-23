import Web3 from 'web3'
import { 
  web3Loaded,
  web3AccountLoaded,
  coinFlipLoaded,
  etherBalanceLoaded,
  coinFlipEtherBalanceLoaded,
  usernameAdded,
  usernameLoaded,
  balanceLoading,
  balanceLoaded,
  betExecuting,
  betExecuted,
  allBetsLoaded,
  allDepositsLoaded,
  treasuryFunded,
  treasuryBalanceLoaded,
  usernameAdding
} from './actions'
import CoinFlip from '../abis/CoinFlip.json'

export const loadWeb3 = (dispatch) => {
  const web3 = new Web3(window.ethereum)
  dispatch(web3Loaded(web3))
  return web3
}

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  dispatch(web3AccountLoaded(account))
  return account
}

export const loadBalances = async (dispatch, web3, coinFlip, account) => {
  if(typeof account !== 'undefined') {
      // Ether balance in wallet
      const etherBalance = await web3.eth.getBalance(account)
      dispatch(etherBalanceLoaded(etherBalance))

      // Ether balance in exchange
      const coinFlipEtherBalance = await coinFlip.methods.playerBalance().call({ from: account })
      dispatch(coinFlipEtherBalanceLoaded(coinFlipEtherBalance))

      const treasuryBalance = await coinFlip.methods.getTreasuryBalance().call()
      console.log(treasuryBalance)
      dispatch(treasuryBalanceLoaded(treasuryBalance))

      // Trigger all balances loaded
      dispatch(balanceLoaded())
    } else {
      window.alert('Please login with MetaMask')
    }
}

export const loadUsername = async (dispatch, coinFlip, account) => {
  if(typeof account !== 'undefined') {
    const username = await coinFlip.methods.getUsername().call({ from: account })
    dispatch(usernameLoaded(username))
  }
}

export const loadCoinFlip = async (web3, networkId, dispatch) => {
  try {
    const contract = new web3.eth.Contract(CoinFlip.abi, CoinFlip.networks[networkId].address)
    dispatch(coinFlipLoaded(contract))
    return contract
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const subscribeToEvents = async (coinFlip, dispatch) => {
  coinFlip.events.Bet({}, (error, event) => {
    loadAllBets(coinFlip, dispatch)
  })  

  // coinFlip.events.Deposit({}, (error, event) => {
  //   dispatch(coinFlipEtherBalanceLoaded())
  // })

  // coinFlip.events.Withdraw({}, (error, event) => {
  //   dispatch(coinFlipEtherBalanceLoaded())
  // })

  // coinFlip.events.Fund({}, (error, event) => {
  //   dispatch(coinFlipEtherBalanceLoaded())
  // })
}

export const loadAllBets = async (coinFlip, dispatch) => {
  // Fetch filled bets with the "Bet" event stream
  const betStream = await coinFlip.getPastEvents('Bet', { fromBlock: 0, toBlock: 'latest' })
  console.log(betStream)
  // Format Filled bets
  let allBets = betStream.map((event) => event.returnValues)

  const checkWins = (bet) => {
    return bet.outcome == "win"
  }

  const checkLoses = (bet) => {
    return bet.outcome == "lose"
  }

  let winBets = allBets.filter(checkWins)
  console.log(winBets)

  let loseBets = allBets.filter(checkLoses)
  console.log(loseBets)

  winBets = winBets.sort((a,b) => b.betAmount - a.betAmount)
  loseBets = loseBets.sort((a,b) => a.betAmount - b.betAmount)
  allBets = {...winBets, ...loseBets}
  console.log({...winBets, ...loseBets})
  // Add bets to the redux store
  dispatch(allBetsLoaded(allBets))
}

export const getUsername = async (dispatch, coinFlip, account) => {
  // Fetch all deposits from "Deposit" event stream
  const username = await coinFlip.methods.getUsername().call({ from: account })
  // add to redux state
  dispatch(usernameAdded(username))
}

export const depositEther = (dispatch, coinFlip, web3, amount, account) => {
  dispatch(balanceLoading())
  coinFlip.methods.deposit().send({ from: account,  value: web3.utils.toWei(`${amount}`, 'ether') })
  .on('transactionHash', (hash) => {
    dispatch(balanceLoaded())
    loadBalances(dispatch, web3, coinFlip, account)
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

export const withdrawEther = (dispatch, coinFlip, web3, amount, account) => {
  coinFlip.methods.playerWithdraw(web3.utils.toWei(`${amount}`, 'ether')).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(balanceLoading())
    loadBalances(dispatch, web3, coinFlip, account)
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

export const withdrawTreasury = (dispatch, coinFlip, web3, amount, account) => {
  coinFlip.methods.withdraw(web3.utils.toWei(`${amount}`, `ether`)).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(balanceLoading())
    loadBalances(dispatch, web3, coinFlip, account)
  })
  .on('error',(error) => {
    console.error(error)
    window.alert('There was an error!')
  })
}

// export const addName = (dispatch, userList, username, account) => {
//   dispatch(usernameAdding(true))
//   let nameAccount = { username, account }
//   // for(let i=0, i=coin)
//   dispatch(usernameAdded(nameAccount))
//   dispatch(usernameAdding(false))
// }

export const addUsername = async (dispatch, coinFlip, username, account) => {
  dispatch(usernameAdding(true))
  await coinFlip.methods.addUsername(username, account).send({ from: account })
  dispatch(usernameAdding(false))
}

export const fundTreasury = (dispatch, coinFlip, web3, amount, account) => {
  let fundAmount = web3.utils.toWei(`${amount}`, 'ether');
  coinFlip.methods.fundTreasury().send({ from: account, value: fundAmount })
  .on('transactionHash', (hash) => {
    dispatch(treasuryFunded(amount))
    loadBalances(dispatch, web3, coinFlip, account)
  })
  .on('errro', (error) => {
    console.log(error)
    window.alert(`There was an error!`)
  })
}

export const flipCoin = (dispatch, coinFlip, web3, amount, account) => {
  // setState betExecuting
  // call coinFlip function in coinFlip contract
  // alter balances based on win or lose
  dispatch(betExecuting())
  let betAmount = web3.utils.toWei(`${amount}`, 'ether');
  coinFlip.methods.coinFlip(betAmount).send( { from: account } )
  .on('transactionHash', (hash) => {
    dispatch(betExecuted())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)  
    dispatch(betExecuted())
  })
}