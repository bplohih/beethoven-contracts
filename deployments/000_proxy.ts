import { HardhatRuntimeEnvironment } from 'hardhat/types';

export default async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // Deploy GnosisSafe
  const GnosisSafe = await deploy('GnosisSafe', {
    from: deployer,
    log: true,
  });

  // Verifired GnosisSafe
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: GnosisSafe.address,
        contract: "contracts/tokens/pools/Proxy/GnosisSafe.sol:GnosisSafe"
        /* constructorArguments: [] */
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract GnosisSafe is already verified!");
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////

  // Deploy GnosisSafeProxy
  const GnosisSafeProxy = await deploy('GnosisSafeProxy', {
    from: deployer,
    args: [GnosisSafe.address],
    log: true,
  });

  // Verifired FTM
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: GnosisSafeProxy.address,
        contract: "contracts/tokens/pools/Proxy/GnosisSafeProxy.sol:GnosisSafeProxy",
        constructorArguments: [GnosisSafe.address]
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract GnosisSafeProxy is already verified!");
      }
    }
  }
}