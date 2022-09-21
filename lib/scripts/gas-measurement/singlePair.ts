import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';

import { TokenList } from '../../helpers/tokens';
import { fp } from '../../helpers/numbers';
import { advanceTime, MINUTE } from '../../helpers/time';
import { MAX_INT256, MAX_UINT256 } from '../../helpers/constants';
import { FundManagement, getTokensSwaps, SWAP_KIND } from '../../helpers/trading';
import { getWeightedPool, getStablePool, printGas, setupEnvironment, tokenSymbols } from './misc';

let vault: Contract;
let tokens: TokenList;

let trader: SignerWithAddress;

const MAX_POOLS = 8;

async function main() {
  ({ vault, tokens, trader } = await setupEnvironment());

  console.log('== Single token pair in multiple pools ==');

  console.log(`\n# Weighted Pools with 2 tokens`);

  await singlePair(() => getWeightedPool(vault, tokens, 2), false, true);
  await singlePair(() => getWeightedPool(vault, tokens, 2), true, true);

  console.log(`\n# Weighted Pools with 4 tokens`);

  await singlePair(() => getWeightedPool(vault, tokens, 4), false);
  await singlePair(() => getWeightedPool(vault, tokens, 4), true);

  console.log(`\n# Stable Pools with 2 tokens`);

  await singlePair(() => getStablePool(vault, tokens, 2), false);
  await singlePair(() => getStablePool(vault, tokens, 2), true);

  console.log(`\n# Stable Pools with 4 tokens`);

  await singlePair(() => getStablePool(vault, tokens, 4), false);
  await singlePair(() => getStablePool(vault, tokens, 4), true);
}

async function singlePair(getPoolId: () => Promise<string>, useInternalBalance: boolean, measureOracle = false) {
  console.log(`\n## ${useInternalBalance ? 'Using Internal Balance' : 'Sending and receiving tokens'}`);

  const funds: FundManagement = {
    sender: trader.address,
    recipient: trader.address,
    fromInternalBalance: useInternalBalance,
    toInternalBalance: useInternalBalance,
  };

  const poolIds: Array<string> = [];
  for (let i = 0; i < MAX_POOLS; ++i) {
    poolIds.push(await getPoolId());
  }

  // Trade token 0 for token 1, putting 0.1e18 of 0 into each pool
  const tokenIn = tokenSymbols[0];
  const tokenOut = tokenSymbols[1];

  for (let poolAmount = 1; poolAmount <= MAX_POOLS; ++poolAmount) {
    if (poolAmount == 1) {
      const swap = () =>
        vault.connect(trader).swap(
          {
            kind: 0,
            poolId: poolIds[0],
            assetIn: tokens[tokenIn].address,
            assetOut: tokens[tokenOut].address,
            amount: fp(0.1),
            userData: '0x',
          },
          funds,
          0,
          MAX_UINT256
        );

      const first = await (await swap()).wait();

      if (measureOracle) {
        const second = await (await swap()).wait();
        console.log(`${poolAmount} pools:`);
        console.log(`  - buffer update: ${printGas(first.gasUsed)} (single swap)`);
        console.log(`  - buffer re-use: ${printGas(second.gasUsed)} (single swap)`);
      } else {
        console.log(`${poolAmount} pools: ${printGas(first.gasUsed)} (simple swap)`);
      }

      // advance time to force batch swap use another oracle sample
      await advanceTime(MINUTE * 5);
    }

    const [tokenAddresses, swaps] = getTokensSwaps(
      tokens,
      poolIds.slice(0, poolAmount).map((poolId) => {
        return { poolId, tokenIn, tokenOut, amount: fp(0.1).toString() };
      })
    );

    const batchSwap = () =>
      vault
        .connect(trader)
        .batchSwap(
          SWAP_KIND.GIVEN_IN,
          swaps,
          tokenAddresses,
          funds,
          Array(tokenAddresses.length).fill(MAX_INT256),
          MAX_UINT256
        );

    const first = await (await batchSwap()).wait();

    if (measureOracle) {
      const second = await (await batchSwap()).wait();
      console.log(`${poolAmount} pools:`);
      console.log(`  - buffer update: ${printGas(first.gasUsed)} (${printGas(first.gasUsed / poolAmount)} per pool)`);
      console.log(`  - buffer re-use: ${printGas(second.gasUsed)} (${printGas(second.gasUsed / poolAmount)} per pool)`);
    } else {
      console.log(`${poolAmount} pools: ${printGas(first.gasUsed)} (${printGas(first.gasUsed / poolAmount)} per pool)`);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
