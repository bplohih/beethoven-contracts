import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployContract } from '../deploy';
import { TokenList } from '../deployArguments';

export default async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  for await (const Token of TokenList as any) {
    // Deploy Tokens
    try {
      await deployContract(Token);
    } catch (err) {
      console.log(`Token '${Token[0].name}' was not deployed or already deployed before!`);
    }
  }
  console.log('\n/// Tokens successfully deployed! ///\n');
}