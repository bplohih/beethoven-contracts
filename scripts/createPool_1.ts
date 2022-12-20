import { ethers } from 'hardhat';
import hre from 'hardhat';
import { compare } from './utils';

async function main() {
  const { deployments } = hre;
  const ADDRESS_CONTRACT = await (await deployments.get('WeightedPoolFactory')).address;

  const WeightedPoolFactory = await ethers.getContractAt('WeightedPoolFactory', ADDRESS_CONTRACT);

  console.log('WeightedPoolFactory: Initialized!');

  await WeightedPoolFactory.create(
    'BNB/ETH/Matic/Fantom',
    'BPT-BEMF',
    [
      await (await deployments.get('WETH')).address,
      await (await deployments.get('MATIC')).address,
      await (await deployments.get('WETH_FTM')).address,
      await (await deployments.get('Binance')).address,
    ].sort((a: string, b) => compare(a, b)),
    ['200000000000000000', '200000000000000000', '300000000000000000', '300000000000000000'],
    '3000000000000000',
    '0xF94AeE7BD5bdfc249746edF0C6Fc0F5E3c1DA226'
  );

  console.log('WeightedPoolFactory: Create Pool!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});