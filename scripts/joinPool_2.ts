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
  const Aave_ADDRESS_CONTRACT = await (await deployments.get('Aave')).address;
  const CurveDAO_ADDRESS_CONTRACT = await (await deployments.get('CurveDAO')).address;
  const USDC_ADDRESS_CONTRACT = await (await deployments.get('USDC')).address;
  const BTC_ADDRESS_CONTRACT = await (await deployments.get('BTC')).address;
  const ChainLink_ADDRESS_CONTRACT = await (await deployments.get('ChainLink')).address;

  // Get contract
  const Vault = await ethers.getContractAt('Vault', Vault_ADDRESS_CONTRACT);
  const WETH = await ethers.getContractAt('WETH', WETH_ADDRESS_CONTRACT);
  const WETH_FTM = await ethers.getContractAt('WETH_FTM', WETH_FTM_ADDRESS_CONTRACT);
  const Aave = await ethers.getContractAt('Aave', Aave_ADDRESS_CONTRACT);
  const CurveDAO = await ethers.getContractAt('CurveDAO', CurveDAO_ADDRESS_CONTRACT);
  const USDC = await ethers.getContractAt('USDC', USDC_ADDRESS_CONTRACT);
  const BTC = await ethers.getContractAt('BTC', BTC_ADDRESS_CONTRACT);
  const ChainLink = await ethers.getContractAt('ChainLink', ChainLink_ADDRESS_CONTRACT);

  console.log('Vault: Initialized');

  // Approve
  await Aave.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await WETH_FTM.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await CurveDAO.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await USDC.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await BTC.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await WETH.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);
  await ChainLink.approve(Vault_ADDRESS_CONTRACT, MAX_UINT);

  // Mint ETH (Fantom)
  await WETH.mint(deployer, '100000000000000000000000000');

  // Aave, WETH_FTM, CurveDao, USDC, Bitcoin, WETH, ChainLink
  const joinPool = await Vault.joinPool(
    '0x2452a5557d551b129156078ea05cff6b785af68e000100000000000000000001',
    deployer,
    deployer,
    {
      assets: [
        Aave_ADDRESS_CONTRACT,
        WETH_FTM_ADDRESS_CONTRACT,
        CurveDAO_ADDRESS_CONTRACT,
        USDC_ADDRESS_CONTRACT,
        BTC_ADDRESS_CONTRACT,
        WETH_ADDRESS_CONTRACT,
        ChainLink_ADDRESS_CONTRACT,
      ],
      maxAmountsIn: [
        ethers.utils.parseUnits('594.42', 18),
        ethers.utils.parseUnits('157380.00', 18),
        ethers.utils.parseUnits('42936.00', 18),
        ethers.utils.parseUnits('40932.00', 6),
        ethers.utils.parseUnits('4.9335', 6),
        ethers.utils.parseUnits('58.5785', 18),
        ethers.utils.parseUnits('5047.00', 18),
      ],
      fromInternalBalance: false,
      userData: encodeJoinExitMockPool(
        0,
        [
          ethers.utils.parseUnits('594.42', 18),
          ethers.utils.parseUnits('157380.00', 18),
          ethers.utils.parseUnits('42936.00', 18),
          ethers.utils.parseUnits('40932.00', 6),
          ethers.utils.parseUnits('4.9335', 6),
          ethers.utils.parseUnits('58.5785', 18),
          ethers.utils.parseUnits('5047.00', 18),
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