require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("./tasks/params.js")
require("./tasks/deployTest.js")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.28",
    // Network configuration
    deployer: {
        default: 0,
    },
    networks: {
        hardhatC: {
            url: process.env.RPC_URL_HARDHAT,
            chainId: Number(process.env.NETWORK_ID_HARDHAT),
            accounts: [
                process.env.PK_HARDHAT ? process.env.PK_HARDHAT.trim() : "",
            ],
        },
        ganacheA: {
            url: process.env.RPC_URL_GANACHE_A,
            chainId: Number(process.env.NETWORK_ID_GANACHE_A),
            accounts: [
                process.env.PK_GANACHE_A ? process.env.PK_GANACHE_A.trim() : "",
            ],
        },
        ganacheB: {
            url: process.env.RPC_URL_GANACHE_B,
            gas: 100000000, // Increase this as needed
            gasPrice: 20000000000,
            chainId: Number(process.env.NETWORK_ID_GANACHE_B),
            accounts: [
                process.env.PK_GANACHE_B ? process.env.PK_GANACHE_B.trim() : "",
            ],
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        token: "ETH",
        gasPriceApi:
            "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=" +
            process.env.ETHERSCAN_API_KEY, // https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=RFDMWQ3YA8NZB43628ACQM9S3MDQ5ASYHE
        coinmarketcap: process.env.COINMARKETCAP_API_KEY, // https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH&CMC_PRO_API_KEY=f800a98c-a5cc-44e8-81a6-9ca04d4c9aa3&convert=USD
        // L1Etherscan: process.env.ETHERSCAN_API_KEY,
        // token: "MATIC",
    },
}
