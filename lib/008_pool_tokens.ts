import { HardhatRuntimeEnvironment } from 'hardhat/types';

export default async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  const vault = await deployments.get('Vault');

  // Deploy WFTM
  const WFTM = await deploy('WFTM', {
    from: deployer,
    args: ["Wrapped Fantom", "WFTM", 18, "1000000000000000"],
    log: true,
  });

  // Verifired WFTM
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: WFTM.address,
        contract: "contracts/tokens/pools/WFTM.sol:WFTM",
        constructorArguments: ["Wrapped Fantom", "WFTM", 18, "1000000000000000"]
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract WFTM is already verified!");
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////

  // Deploy ETH
  const WrappedEth = await deploy('WrappedEth', {
    from: deployer,
    log: true,
  });

  // Verifired ETH
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: WrappedEth.address,
        contract: "contracts/tokens/pools/WrappedEth.sol:WrappedEth"
        /* constructorArguments: [] */
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract WrappedEth is already verified!");
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////

  // Deploy Binance
  const Binance = await deploy('Binance', {
    from: deployer,
    args: ["Binance", "BNB", 18, ZERO_ADDRESS, vault.address],
    log: true,
  });

  // Verifired Binance
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: Binance.address,
        contract: "contracts/tokens/pools/Binance.sol:Binance",
        constructorArguments: ["Binance", "BNB", 18, ZERO_ADDRESS, vault.address]
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract Binance is already verified!");
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////
  
  // Deploy MATIC
  const MATIC = await deploy('MATIC', {
    from: deployer,
    args: ["MATIC", "MATIC", 18, ZERO_ADDRESS, vault.address],
    log: true,
  });

  // Verifired MATIC
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: MATIC.address,
        contract: "contracts/tokens/pools/MATIC.sol:MATIC",
        constructorArguments: ["MATIC", "MATIC", 18, ZERO_ADDRESS, vault.address]
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract MATIC is already verified!");
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////

  // Deploy USDC
  const USDC = await deploy('USDC', {
    from: deployer,
    args: ["USD Coin", "USDC", 6, deployer],
    log: true,
  });

  // Verifired USDC
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: USDC.address,
        contract: "contracts/tokens/pools/USDC.sol:USDC",
        constructorArguments: ["USD Coin", "USDC", 6, deployer]
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract USDC is already verified!");
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////

  // Deploy CurveDAO
  const CurveDAO = await deploy('CurveDAO', {
    from: deployer,
    args: ["Curve DAO", "CRV", 18, deployer],
    log: true,
  });

  // Verifired CurveDAO
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: CurveDAO.address,
        contract: "contracts/tokens/pools/CurveDAO.sol:CurveDAO",
        constructorArguments: ["Curve DAO", "CRV", 18, deployer]
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract CurveDAO is already verified!");
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////

  // Deploy Bitcoin
  const Bitcoin = await deploy('BTC', {
    from: deployer,
    args: ["Bitcoin", "BTC", 8, deployer],
    log: true,
  });

  // Verifired Bitcoin
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: Bitcoin.address,
        contract: "contracts/tokens/pools/BTC.sol:BTC",
        constructorArguments: ["Bitcoin", "BTC", 8, deployer]
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract BTC is already verified!");
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////

  // Deploy Aave
  const Aave = await deploy('Aave', {
    from: deployer,
    args: ["Aave", "AAVE", 18, deployer],
    log: true,
  });

  // Verifired Aave
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: Aave.address,
        contract: "contracts/tokens/pools/Aave.sol:Aave",
        constructorArguments: ["Aave", "AAVE", 18, deployer]
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract Aave is already verified!");
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////

  // Deploy ChainLink
  const ChainLink = await deploy('ChainLink', {
    from: deployer,
    args: ["ChainLink", "LINK", 18, deployer],
    log: true,
  });

  // Verifired ChainLink
  if (hre.network.live) {
    try {
      await hre.run("verify:verify", {
        address: ChainLink.address,
        contract: "contracts/tokens/pools/ChainLink.sol:ChainLink",
        constructorArguments: ["ChainLink", "LINK", 18, deployer]
      });
    } catch (err: any) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract ChainLink is already verified!");
      }
    }
  }
}