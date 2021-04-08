import Web3 from 'web3'
import { 
  web3Loaded,
  web3AccountLoaded,
  coinFlipLoaded,
  etherBalanceLoaded,
  coinFlipEtherBalanceLoaded,
  balanceLoading,
  balanceLoaded
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
      const coinFlipEtherBalance = await coinFlip.methods.balanceOf(account).call()
      dispatch(coinFlipEtherBalanceLoaded(coinFlipEtherBalance))

      // Trigger all balances loaded
      dispatch(balanceLoaded())
    } else {
      window.alert('Please login with MetaMask')
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
  coinFlip.events.Flip({}, (error, event) => {
    dispatch(coinFlip(event.returnValues))
  })  

  coinFlip.events.Deposit({}, (error, event) => {
    dispatch(etherBalanceLoaded())
  })

  coinFlip.events.Withdraw({}, (error, event) => {
    dispatch(etherBalanceLoaded())
  })
}

export const depositEther = (dispatch, coinFlip, web3, amount, account) => {
  coinFlip.methods.deposit().send({ from: account,  value: web3.utils.toWei(`${amount}`, 'ether') })
  .on('transactionHash', (hash) => {
    dispatch(balanceLoading())
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

export const withdrawEther = (dispatch, coinFlip, web3, amount, account) => {
  coinFlip.methods.withdraw(web3.utils.toWei(`${amount}`, 'ether')).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(balanceLoading())
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

export const flipCoin = ( dispatch, coinFlip, amount, account ) => {
  // call coinFlip function in coinFlip contract
  // alter balances based on win or lose
}