import { ethers } from 'hardhat';
import hre from 'hardhat';
import { compare } from './utils';

async function main() {
  const { deployments } = hre;
  const ADDRESS_CONTRACT = await (await deployments.get('WeightedPoolFactory')).address;

  const WeightedPoolFactory = await ethers.getContractAt('WeightedPoolFactory', ADDRESS_CONTRACT);

  console.log('WeightedPoolFactory: initialized');

  await WeightedPoolFactory.create(
    'BNB/ETH/Matic/Fantom',
    'BPT-BEMF',
    [
      await (await deployments.get('WFTM')).address,
      await (await deployments.get('MATIC')).address,
      await (await deployments.get('USDC')).address,
      await (await deployments.get('Binance')).address,
    ].sort((a: string, b) => compare(a, b)),
    ['200000000000000000', '200000000000000000', '300000000000000000', '300000000000000000'],
    '3000000000000000',
    '0xe36316FbDEE9f9CC92C4bDa8D1E682f5A97F910e'
  );

  console.log('WeightedPoolFactory: Create Pool!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});