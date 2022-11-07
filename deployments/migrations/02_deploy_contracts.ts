import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployContract } from '../deploy';
import { ContractList } from '../deployArguments';

export default async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  const ContractL = await ContractList();
  
  for await (const Contract of ContractL as any) {
    // Deploy Tokens
    try {
      await deployContract(Contract);
    } catch (err) {
      console.log(`Contract '${Contract.name}' was not deployed or already deployed before!`);
    }
  }
  console.log('\n/// Contracts successfully deployed! ///\n');
}