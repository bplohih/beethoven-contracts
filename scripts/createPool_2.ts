import { ethers } from 'hardhat';
import hre from 'hardhat';
import { compare } from './utils';

async function main() {
  const { deployments } = hre;
  const ADDRESS_CONTRACT = await (await deployments.get('WeightedPoolFactory')).address;

  const WeightedPoolFactory = await ethers.getContractAt('WeightedPoolFactory', ADDRESS_CONTRACT);

  console.log('WeightedPoolFactory: Initialized!');

  await WeightedPoolFactory.create(
    'Juku7',
    'Juku7',
    [
      await (await deployments.get('USDC')).address,
      await (await deployments.get('CurveDAO')).address,
      await (await deployments.get('WETH')).address,
      await (await deployments.get('BTC')).address,
      await (await deployments.get('Aave')).address,
      await (await deployments.get('WETH_FTM')).address,
      await (await deployments.get('ChainLink')).address,
    ].sort((a: string, b) => compare(a, b)),
    [
      '100000000000000000',
      '100000000000000000',
      '100000000000000000',
      '250000000000000000',
      '125000000000000000',
      '225000000000000000',
      '100000000000000000'
    ],
    '3000000000000000',
    '0xF94AeE7BD5bdfc249746edF0C6Fc0F5E3c1DA226'
  );

  console.log('WeightedPoolFactory: Create Pool!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
