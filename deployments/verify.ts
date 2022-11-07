import hre from 'hardhat';

export const verifyContract = async (
  address: string,
  options: {
    name?: string;
    contractPath?: string;
    arguments?: [];
  }
) => {
  return await hre.run('verify:verify', {
    address,
    contract: options.contractPath,
    constructorArguments: options.arguments,
  });
};