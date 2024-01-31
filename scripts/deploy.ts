import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const signer = await ethers.provider.getSigner(0);
  const signerAddress = await signer.getAddress();
  const signerBalance = await ethers.provider.getBalance(signerAddress);

  console.log(`Deploying Lock. Owner: ${signerAddress}. Balance: ${signerBalance.toString()}`);

  const lockedAmount = 100n;

  const lockFactory = await ethers.getContractFactory("Lock");

  const lock = await lockFactory.deploy(unlockTime, {
    customData: [unlockTime],
    value: lockedAmount,
  });

  await lock.waitForDeployment();
  const lockAddress = await lock.getAddress();

  console.log(
    `Lock with ${lockedAmount.toString()} and unlock timestamp ${unlockTime} deployed to ${lockAddress}`
  );

  const lockBalance = await ethers.provider.getBalance(lockAddress);
  console.log(`Lock balance: ${lockBalance.toString()}`);

  const lockUnlockTime = await lock.unlockTime();
  console.log(`Lock unlock time: ${lockUnlockTime.toString()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
