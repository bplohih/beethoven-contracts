import { ethers } from 'ethers';
import hre from 'hardhat';
import { MONTH } from '../lib/helpers/time';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const totalSupply = ethers.utils.parseUnits('1000000.0', 18);
const THREE_MONTHS = MONTH * 3;

let AuthorizerContract: any;
let WETHContract: any;
let VaultContract: any;
let WeightedPoolFactoryContract: any;

export const TokenList = [
  {
    name: 'Aave',
    contractPath: 'contracts/tokens/pools/Aave.sol:Aave',
    arguments: ['Aave', 'AAVE', 18, totalSupply],
  },
  {
    name: 'Binance',
    contractPath: 'contracts/tokens/pools/Binance.sol:Binance',
    arguments: ['Binance', 'BNB', 18, totalSupply],
  },
  {
    name: 'BTC',
    contractPath: 'contracts/tokens/pools/BTC.sol:BTC',
    arguments: ['Bitcoin', 'BTC', 6, totalSupply],
  },
  {
    name: 'ChainLink',
    contractPath: 'contracts/tokens/pools/ChainLink.sol:ChainLink',
    arguments: ['ChainLink', 'LINK', 18, totalSupply],
  },
  {
    name: 'CurveDAO',
    contractPath: 'contracts/tokens/pools/CurveDAO.sol:CurveDAO',
    arguments: ['Curve DAO', 'CRV', 18, totalSupply],
  },
  {
    name: 'MATIC',
    contractPath: 'contracts/tokens/pools/MATIC.sol:MATIC',
    arguments: ['MATIC', 'MATIC', 18, totalSupply],
  },
  {
    name: 'USDC',
    contractPath: 'contracts/tokens/pools/USDC.sol:USDC',
    arguments: ['USD Coin', 'USDC', 6, totalSupply],
  },
  {
    name: 'WFTM',
    contractPath: 'contracts/tokens/pools/WFTM.sol:WFTM',
    arguments: ['Wrapped Fantom', 'WFTM', 18, totalSupply],
  },
];

export const ContractList = async () => {
  const { deployments, getNamedAccounts } = hre as HardhatRuntimeEnvironment;
  const { deployer, admin } = await getNamedAccounts();

  try {
    AuthorizerContract = await (await deployments.get('Authorizer')).address;
    WETHContract = await (await deployments.get('WETH')).address;
    VaultContract = await (await deployments.get('Vault')).address;
    WeightedPoolFactoryContract = await (await deployments.get('WeightedPoolFactory')).address;
  } catch (err) {}

  return [
    {
      name: 'Authorizer',
      contractPath: 'contracts/vault/Authorizer.sol.sol:Authorizer',
      arguments: [admin],
    },
    {
      name: 'TokenFactory',
      contractPath: 'contracts/test/TokenFactory.sol:TokenFactory',
      arguments: [],
    },
    {
      name: 'WETH',
      contractPath: 'contracts/test/WETH.sol:WETH',
      arguments: [deployer],
    },
    {
      name: 'Multicall',
      contractPath: 'contracts/test/Multicall.sol:Multicall',
      arguments: [],
    },
    {
      name: 'Vault',
      contractPath: 'contracts/vault/Vault.sol:Vault',
      arguments: [AuthorizerContract, WETHContract, THREE_MONTHS, MONTH],
    },
    {
      name: 'WeightedPoolFactory',
      contractPath: 'contracts/pools/weighted/WeightedPoolFactory.sol:WeightedPoolFactory',
      arguments: [VaultContract],
    },
    {
      name: 'BeetsBar',
      contractPath: 'contracts/tokens/fBEETS.sol:BeetsBar',
      arguments: [WeightedPoolFactoryContract],
    },
    {
      name: 'StablePoolFactory',
      contractPath: 'contracts/pools/stable/StablePoolFactory.sol:StablePoolFactory',
      arguments: [VaultContract],
    },
    {
      name: 'BalancerHelpers',
      contractPath: 'contracts/lib/helpers/BalancerHelpers.sol:BalancerHelpers',
      arguments: [VaultContract],
    },
    {
      name: 'BeethovenxToken',
      contractPath: 'contracts/tokens/BEETS.sol:BeethovenxToken',
      arguments: [],
    },
  ];
};
