import { ethers } from 'hardhat';
import hre from 'hardhat';
import { encodeJoinExitMockPool } from './utils';

async function main() {
  const { deployments, getNamedAccounts } = hre;
  const { deployer, admin } = await getNamedAccounts();
  const MAX_UINT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
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

  const joinPool = await Vault.joinPool(
    '0xF94AEE7BD5BDFC249746EDF0C6FC0F5E3C1DA226000100000000000000000009',
    deployer,
    deployer,
    {
      assets: [WFTM_ADDRESS_CONTRACT, MATIC_ADDRESS_CONTRACT, USDC_ADDRESS_CONTRACT, BNB_ADDRESS_CONTRACT],
      maxAmountsIn: ['0', '10000000000000000000', '0', '0'],
      fromInternalBalance: false,
      userData: encodeJoinExitMockPool(['0', '10000000000000000000', '0', '0'], 0),
    }
  )
  
  console.log('Vault: JoinPool Done!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});