// scripts/estimateGas.js
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

// Base RPC (Mainnet or Sepolia)
const BASE_RPC = process.env.BASE_RPC || "https://mainnet.base.org";
const provider = new ethers.JsonRpcProvider(BASE_RPC);

async function estimateGas() {
  try {
    // Fetch latest block
    const block = await provider.getBlock("latest");

    if (!block || !block.baseFeePerGas) {
      console.log("Could not fetch base fee. Using fallback 0 wei.");
      return;
    }

    // Base fee per gas (EIP-1559)
    const baseFee = block.baseFeePerGas;

    // Optional: add a tip multiplier (e.g., 1.1 for faster inclusion)
    const recommendedGasPrice = baseFee.mul(110).div(100);

    console.log("=== Base Gas Estimator ===");
    console.log("Base Fee (wei):", baseFee.toString());
    console.log("Recommended Gas Price (wei, 10% tip):", recommendedGasPrice.toString());

    return recommendedGasPrice;
  } catch (err) {
    console.error("Error estimating gas:", err);
  }
}

// Run the estimator
estimateGas();
