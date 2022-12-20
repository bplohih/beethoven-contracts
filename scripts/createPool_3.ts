import { ethers } from 'hardhat';
import hre from 'hardhat';
import { compare } from './utils';

async function main() {
  const { deployments } = hre;
  const ADDRESS_CONTRACT = await (await deployments.get('WeightedPoolFactory')).address;

  const WeightedPoolFactory = await ethers.getContractAt('WeightedPoolFactory', ADDRESS_CONTRACT);

  console.log('WeightedPoolFactory: Initialized!');

  await WeightedPoolFactory.create(
    'Fantom of the Opera',
    'FTM-Opera',
    [
      await (await deployments.get('USDC')).address,
      await (await deployments.get('WETH')).address
    ].sort((a: string, b) => compare(a, b)),
    [
      '300000000000000000',
      '700000000000000000',
    ],
    '2500000000000000',
    '0xF94AeE7BD5bdfc249746edF0C6Fc0F5E3c1DA226'
  );

  console.log('WeightedPoolFactory: Create Pool!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
