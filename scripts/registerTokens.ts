import { ethers } from 'hardhat';
import hre from 'hardhat';

async function main() {
  const { deployments, getNamedAccounts } = hre;
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
  const Vault_ADDRESS_CONTRACT = await (await deployments.get('Vault')).address;

  // Get contract
  const Vault = await ethers.getContractAt('Vault', Vault_ADDRESS_CONTRACT);

  // Get Tokens
  const WFTM_ADDRESS_CONTRACT = await (await deployments.get('WFTM')).address;
  const MATIC_ADDRESS_CONTRACT = await (await deployments.get('MATIC')).address;
  const USDC_ADDRESS_CONTRACT = await (await deployments.get('USDC')).address;
  const BNB_ADDRESS_CONTRACT = await (await deployments.get('Binance')).address;

  console.log('Vault: Initialized');

  await Vault.registerTokens(
    '0x4bdad1f2609117b4cecf3ff7c1c1253b8da7ef62000100000000000000000000',
    [WFTM_ADDRESS_CONTRACT, MATIC_ADDRESS_CONTRACT, USDC_ADDRESS_CONTRACT, BNB_ADDRESS_CONTRACT],
    [ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS]
  );

  console.log('Vault: RegisterTokens Done!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});