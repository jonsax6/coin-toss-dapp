const CoinFlip = artifacts.require("CoinFlip");

const ether = (n) => {
  return new web3.utils.BN(
      web3.utils.toWei(n.toString(), 'ether')
  )
}

const wait = (seconds) => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = async function(callback) {
  try {
    const accounts = await web3.eth.getAccounts()
    const coinFlip = await CoinFlip.deployed()
    console.log('CoinFlip fetched', coinFlip.address)

    const owner = accounts[0]
    const player1 = accounts[1]
    const player2 = accounts[2]
    const username_owner = "CoinFlip"
    const username1 = "Jonathan"
    const username2 = "Katelin"

    let amount = ether(2)
    await coinFlip.fundTreasury({ from: owner, value: amount })
    console.log(`Funded ${amount} ether to coinFlip contract`)

    amount = ether(1)
    await coinFlip.deposit({ from: owner, value: amount })
    console.log(`Deposit ${amount} ether to owner contract account`)
    await coinFlip.deposit({ from: player1, value: amount })
    console.log(`Deposit ${amount} ether to player1 contract account`)
    await coinFlip.deposit({ from: player2, value: amount })
    console.log(`Deposit ${amount} ether to player2 contract account`)

    await coinFlip.addUsername(username_owner, owner, { from: owner })
    console.log(`added username ${username_owner} to owner contract account`)
    await coinFlip.addUsername(username1, player1, { from: player1 })
    console.log(`added username ${username1} to username1 contract account`)
    await coinFlip.addUsername(username2, player2, { from: player2 })
    console.log(`added username ${username2} to username2 contract account`)

    await coinFlip.coinFlip(ether(0.01), { from: owner })
    console.log(`bet on owner contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.02), { from: player1 })
    console.log(`bet on player1 contract account`)
    await wait(2)
    
    await coinFlip.coinFlip(ether(0.02), { from: player2 })
    console.log(`bet on player2 contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.015), { from: owner })
    console.log(`bet on owner contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.025), { from: player1 })
    console.log(`bet on player1 contract account`)
    await wait(2)
    
    await coinFlip.coinFlip(ether(0.05), { from: player2 })
    console.log(`bet on player2 contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.035), { from: owner })
    console.log(`bet on owner contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.02), { from: player1 })
    console.log(`bet on player1 contract account`)
    await wait(2)
    
    await coinFlip.coinFlip(ether(0.02), { from: player2 })
    console.log(`bet on player2 contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.011), { from: owner })
    console.log(`bet on owner contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.022), { from: player1 })
    console.log(`bet on player1 contract account`)
    await wait(2)
    
    await coinFlip.coinFlip(ether(0.055), { from: player2 })
    console.log(`bet on player2 contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.07), { from: player2 })
    console.log(`bet on player2 contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.012), { from: owner })
    console.log(`bet on owner contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.023), { from: player1 })
    console.log(`bet on player1 contract account`)
    await wait(2)
    
    await coinFlip.coinFlip(ether(0.055), { from: player2 })
    console.log(`bet on player2 contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.034), { from: owner })
    console.log(`bet on owner contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.012), { from: player1 })
    console.log(`bet on player1 contract account`)
    await wait(2)
    
    await coinFlip.coinFlip(ether(0.023), { from: player2 })
    console.log(`bet on player2 contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.0115), { from: owner })
    console.log(`bet on owner contract account`)
    await wait(2)

    await coinFlip.coinFlip(ether(0.014), { from: player1 })
    console.log(`bet on player1 contract account`)
    await wait(2)
    
    await coinFlip.coinFlip(ether(0.023), { from: player2 })
    console.log(`bet on player2 contract account`)
    await wait(2)

  }
  catch(error) {
    console.log(error)
  }
  callback()
}