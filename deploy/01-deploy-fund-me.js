//imports
//main function
//call mainfuction

const { network, get } = require("hardhat");
const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
require("dotenv").config();

// function deployFunc() {
//     console.log("Hi");
// }

// module.exports.default = deployFunc;

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    //using mocks

    // if chainid is X, use address Y

    // const ethUsdPriceAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    let ethUsdPriceAddress;
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    log("----------------------------------");
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceAddress], //pur priceFeed here,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHER_SCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceAddress]);
    }
};

module.exports.tags = ["all", "fundme"];
