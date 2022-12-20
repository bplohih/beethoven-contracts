import { ethers } from 'hardhat';
import hre from 'hardhat';
import { encodeJoinExitMockPool } from './utils';

async function main() {
  const { deployments, getNamedAccounts } = hre;
  const { deployer, admin } = await getNamedAccounts();
  const MAX_UINT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

  const Vault_ADDRESS_CONTRACT = await (await deployments.get('Vault')).address;

  // Get Tokens
  const WETH_ADDRESS_CONTRACT = await (await deployments.get('WETH')).address;
  const USDC_ADDRESS_CONTRACT = await (await deployments.get('USDC')).address;

  // Get contract
  const Vault = await ethers.getContractAt('Vault', Vault_ADDRESS_CONTRACT);
  const WETH = await ethers.getContractAt('WETH', WETH_ADDRESS_CONTRACT);
  const USDC = await ethers.getContractAt('USDC', USDC_ADDRESS_CONTRACT);

  console.log('Vault: Initialized');

  // Approve
  await WETH.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await USDC.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);

  // Mint ETH (Fantom)
  await WETH.mint(deployer, '100000000000000000000000000');

  const joinPool = await Vault.joinPool(
    '0x1552720c27dd6ee2f2e837264c4d0a8fca231349000200000000000000000002',
    deployer,
    deployer,
    {
      assets: [USDC_ADDRESS_CONTRACT, WETH_ADDRESS_CONTRACT],
      maxAmountsIn: [ethers.utils.parseUnits('300000.00', 6), ethers.utils.parseUnits('700000.00', 18)],
      fromInternalBalance: false,
      userData: encodeJoinExitMockPool(
        0,
        [ethers.utils.parseUnits('300000.00', 6), ethers.utils.parseUnits('700000.00', 18)],
        1
      ),
    }
  );

  console.log('Vault: JoinPool Done!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});