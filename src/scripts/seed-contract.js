const CoinFlip = artifacts.require("CoinFlip");

const ether = (n) => {
  return new web3.utils.BN(
      web3.utils.toWei(n.toString(), 'ether')
  )
}

module.exports = async function(callback) {
  try {
    const accounts = await web3.eth.getAccounts()
    const coinFlip = await CoinFlip.deployed()
    console.log('CoinFlip fetched', coinFlip.address)

    const owner = accounts[0]
    const player1 = accounts[1]
    const player2 = accounts[2]
    const username_owner = "Owner"
    const username1 = "Jonathan"
    const username2 = "Katelin"

    let amount = ether(10)
    await coinFlip.fundTreasury({ from: owner, value: amount })
    console.log(`Funded ${amount} ether to coinFlip contract`)

    amount = ether(1)
    await coinFlip.deposit({ from: owner, value: amount })
    await coinFlip.deposit({ from: player1, value: amount })
    await coinFlip.deposit({ from: player2, value: amount })

    await coinFlip.addUsername(username_owner, owner { from: owner })
    await coinFlip.addUsername(username1, player1 { from: player1 })
    await coinFlip.addUsername(username2, player2 { from: player2 })

    amount = ether(0.1)
    await coinFlip.coinFlip(amount { from: owner })
    await coinFlip.coinFlip(amount { from: player1 })
    await coinFlip.coinFlip(amount { from: player2 })
  }
  catch(error) {
    console.log(error)
  }
  callback()
}