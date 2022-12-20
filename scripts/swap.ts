import { ethers } from 'hardhat';
import hre from 'hardhat';

async function main() {
  const { deployments, getNamedAccounts } = hre;
  const { deployer, admin } = await getNamedAccounts();
  const MAX_UINT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
  const usdtAmounts = [ethers.utils.parseEther('1000')];

  const Vault_ADDRESS_CONTRACT = await (await deployments.get('Vault')).address;

  // Get Tokens
  const WFTM_ADDRESS_CONTRACT = await (await deployments.get('WFTM')).address;
  const MATIC_ADDRESS_CONTRACT = await (await deployments.get('MATIC')).address;
  const USDC_ADDRESS_CONTRACT = await (await deployments.get('USDC')).address;
  const BNB_ADDRESS_CONTRACT = await (await deployments.get('Binance')).address;

  // Get contract
  const Vault = await ethers.getContractAt('Vault', Vault_ADDRESS_CONTRACT);
  const WFTM = await ethers.getContractAt('WFTM', WFTM_ADDRESS_CONTRACT);
  const MATIC = await ethers.getContractAt('MATIC', MATIC_ADDRESS_CONTRACT);
  const USDC = await ethers.getContractAt('USDC', USDC_ADDRESS_CONTRACT);
  const BNB = await ethers.getContractAt('Binance', BNB_ADDRESS_CONTRACT);

  console.log('Vault: initialized');
  // Transfer
  /* await WFTM.transfer(deployer, usdtAmounts[0]);
  await MATIC.transfer(deployer, usdtAmounts[0]);
  await USDC.transfer(deployer, usdtAmounts[0]);
  await BNB.transfer(deployer, usdtAmounts[0]); */

  // Approve
  /* await WFTM.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await MATIC.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await USDC.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await BNB.approve(Vault_ADDRESS_CONTRACT, MAX_UINT); */

  const Swap = await Vault.swap(
    {
      poolId: "0x921f633eecbed8d26351e86a684ced1c7af9d70e000100000000000000000000",
      kind: 0,
      assetIn: USDC_ADDRESS_CONTRACT,
      assetOut: BNB_ADDRESS_CONTRACT,
      amount: ethers.utils.parseUnits('1000.0', 6),
      userData: '0x',
    },
    {
      sender: deployer,
      fromInternalBalance: false,
      recipient: deployer,
      toInternalBalance: false,
    },
    1,
    MAX_UINT
  );

  console.log('Vault: Swap Done!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
