import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { verifyContract } from '../verify';
import { ContractList } from '../deployArguments';

export default async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  const { deployments } = hre;

  const ContractVerifitedList = await ContractList();

  // Verifited Tokens
  for await (const VerifiredContract of ContractVerifitedList as any) {
    try {
      await verifyContract(await (await deployments.get(VerifiredContract.name)).address, VerifiredContract);
    } catch (err: any) {
      if (err.message.includes('Reason: Already Verified')) {
        console.log(`- Contract '${VerifiredContract.name}' successfully verified!`);
      }
    }
  }
}