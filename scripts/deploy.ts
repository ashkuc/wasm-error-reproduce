import {ethers} from 'hardhat'

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const unlockTime = currentTimestampInSeconds + 60

  const signer = await ethers.provider.getSigner(0)
  const signerAddress = await signer.getAddress()
  const signerBalance = await ethers.provider.getBalance(signerAddress)

  console.log(`Deploying Lock. Owner: ${signerAddress}. Balance: ${signerBalance.toString()}`)

  const lockedAmount = 100n

  const lockFactory = await ethers.getContractFactory('Lock')

  const tx = await lockFactory.getDeployTransaction(unlockTime, {
    customData: [unlockTime],
    value: lockedAmount,
  })

  // throws here
  const estimatedGas = await signer.estimateGas(tx)

  console.log(`Estimated gas: ${estimatedGas.toString()}`)

  const lock = await lockFactory.deploy(unlockTime, {
    customData: [unlockTime],
    value: lockedAmount,
    gasLimit: 3000000,
  })

  await lock.waitForDeployment()
  const lockAddress = await lock.getAddress()

  console.log(
    `Lock with ${lockedAmount.toString()} and unlock timestamp ${unlockTime} deployed to ${lockAddress}`,
  )

  const lockBalance = await ethers.provider.getBalance(lockAddress)
  console.log(`Lock balance: ${lockBalance.toString()}`)

  const lockUnlockTime = await lock.unlockTime()
  console.log(`Lock unlock time: ${lockUnlockTime.toString()}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
