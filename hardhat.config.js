const { version } = require("chai");
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");

const SEPOLIA_RPC =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/vpQldVEHjGIhXQ_p57xl4JTHLDUb0uu8";
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "0x16de2f96fd0ca175869fe2ebf036a7f2b461b625ccd1c3183acd49136c90a960";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const ETHER_SCAN_API_KEY = process.env.ETHER_SCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    defaultNetwork: "hardhat",
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    networks: {
        sepolia: {
            url: SEPOLIA_RPC,
            accounts: [PRIVATE_KEY.toString()],
            chainId: 11155111,
            blockConfirmations: 6,
        },
    },
    etherscan: {
        apiKey: ETHER_SCAN_API_KEY,
        // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
};
