/* //@ts-ignore
async function test() {
    try {
        await hre.run('verify:verify', {
          address: deployToken.address,
          contract: Token.contractPath,
          constructorArguments: [Token.name, Token.symbol, Token.decimals, Token.totalSupply],
        });
      } catch (err: any) {
        if (err.message.includes('Reason: Already Verified')) {
          console.log(`Token '${Token.contract}' is successfully verified!`);
        }
      }
}

// Verifired Authorizer
try {
  await hre.run('verify:verify', {
    address: Authorizer.address,
    contract: 'contracts/vault/Authorizer.sol:Authorizer',
    constructorArguments: [admin],
  });
} catch (err: any) {
  if (err.message.includes('Reason: Already Verified')) {
    console.log("Contract 'Authorizer' is already verified!");
  }
}

try {
  await verifyContract(deployToken.address, Token);
} catch (err: any) {
  if (err.message.includes('Reason: Already Verified')) {
    console.log(`Token '${Token.contract}' is successfully verified!`);
  }
}

const getAuthorizer = await deployments.get('Authorizer');
    if (getAuthorizer.address) {
      console.log("Contract 'Authorizer' is already deployed before!");
    } */







/*     import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { MONTH } from '../../lib/helpers/time';

export default async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  let WETH;
  const authorizer = await deployments.get('Authorizer');
  const THREE_MONTHS = MONTH * 3;

  WETH = await (await deployments.get('WETH')).address;

  const Vault = await deploy('Vault', {
    from: deployer,
    args: [authorizer.address, WETH, THREE_MONTHS, MONTH],
    log: true,
  });

  // Verifired Vault
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: Vault.address,
        contract: "contracts/vault/Vault.sol:Vault",
        constructorArguments: [authorizer.address, WETH, THREE_MONTHS, MONTH]
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract Vault is already verified!");
      }
    }
  }
} */