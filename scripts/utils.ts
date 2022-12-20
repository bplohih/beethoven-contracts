import { ethers } from 'hardhat';

export const compare = (address: string, anotherToken: string) => {
  return address.toLowerCase() > anotherToken.toLowerCase() ? 1 : -1;
};

export const encodeJoinExitMockPool = (amounts: number, amountsIn: any, minimumBPT: any) => {
  return ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]', 'uint256'], [amounts, amountsIn, minimumBPT]);
};