import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployContract } from '../deploy';
import { ContractList } from '../deployArguments';

export default async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  const ContractL = await ContractList();

  for await (const Contract of ContractL as any) {
    try {
      let DeployContract;
      const { name } = Contract;

      const getActualContract = await ContractList();
      getActualContract.filter((getContract) => {
        if (getContract.name === name) {
          DeployContract = getContract;
        }
      });

      // Deploy contract
      await deployContract(DeployContract);
    } catch (err) {
      console.log(`Contract '${Contract.name}' was not deployed or already deployed before!`);
    }
  }
  console.log('\n/// Contracts successfully deployed! ///\n');
}