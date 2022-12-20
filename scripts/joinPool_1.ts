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
  const WETH_FTM_ADDRESS_CONTRACT = await (await deployments.get('WETH_FTM')).address;
  const MATIC_ADDRESS_CONTRACT = await (await deployments.get('MATIC')).address;
  const BNB_ADDRESS_CONTRACT = await (await deployments.get('Binance')).address;

  // Get contract
  const Vault = await ethers.getContractAt('Vault', Vault_ADDRESS_CONTRACT);
  const WETH = await ethers.getContractAt('WETH', WETH_ADDRESS_CONTRACT);
  const MATIC = await ethers.getContractAt('MATIC', MATIC_ADDRESS_CONTRACT);
  const BNB = await ethers.getContractAt('Binance', BNB_ADDRESS_CONTRACT);
  const WETH_FTM = await ethers.getContractAt('WETH_FTM', WETH_FTM_ADDRESS_CONTRACT);

  console.log('Vault: Initialized');

  // Approve
  await WETH.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await MATIC.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await WETH_FTM.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await BNB.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);

  // Mint ETH (Fantom)
  await WETH.mint(deployer, '100000000000000000000000000');

  const joinPool = await Vault.joinPool(
    '0x9d18356017be509b4d9d64fd96eaff7a2f275111000100000000000000000000',
    deployer,
    deployer,
    {
      assets: [MATIC_ADDRESS_CONTRACT, BNB_ADDRESS_CONTRACT, WETH_FTM_ADDRESS_CONTRACT, WETH_ADDRESS_CONTRACT],
      maxAmountsIn: [
        ethers.utils.parseUnits('42729.00', 18),
        ethers.utils.parseUnits('230.54', 18),
        ethers.utils.parseUnits('48.6412', 18),
        ethers.utils.parseUnits('195637.00', 18),
      ],
      fromInternalBalance: false,
      userData: encodeJoinExitMockPool(
        0,
        [
          ethers.utils.parseUnits('42729.00', 18),
          ethers.utils.parseUnits('230.54', 18),
          ethers.utils.parseUnits('48.6412', 18),
          ethers.utils.parseUnits('195637.00', 18),
        ],
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