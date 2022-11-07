import { HardhatRuntimeEnvironment } from 'hardhat/types';
import hre from 'hardhat';

export const deployContract = async (Contract: any) => {
  const { deployments, getNamedAccounts } = hre as HardhatRuntimeEnvironment;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  return await deploy(Contract.name, {
    from: deployer,
    args: Contract.arguments,
    log: true,
  });
};