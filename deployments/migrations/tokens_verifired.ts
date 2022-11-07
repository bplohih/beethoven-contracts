import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { verifyContract } from '../verify';
import { TokenList } from '../deployArguments';

export default async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  const { deployments } = hre;

  // Verifited Tokens
  for await (const VerifiredToken of TokenList as any) {
    try {
      await verifyContract(await (await deployments.get(VerifiredToken.name)).address, VerifiredToken);
    } catch (err: any) {
      if (err.message.includes('Reason: Already Verified')) {
        console.log(`- Contract '${VerifiredToken.name}' successfully verified!`);
      }
    }
  }
}