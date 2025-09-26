require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const BASE_MAINNET_RPC = "https://mainnet.base.org";
const BASE_SEPOLIA_RPC = "https://sepolia.base.org";

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    baseMainnet: {
      url: BASE_MAINNET_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    baseSepolia: {
      url: BASE_SEPOLIA_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  }
};