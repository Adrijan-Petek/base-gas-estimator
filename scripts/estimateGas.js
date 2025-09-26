import { ethers } from "ethers";

const BASE_RPC = "https://mainnet.base.org"; // Base mainnet RPC
const provider = new ethers.JsonRpcProvider(BASE_RPC);

async function estimateGasPrice() {
  const latestBlock = await provider.getBlock("latest");
  const numBlocks = 10;
  let gasPrices = [];

  for (let i = 0; i < numBlocks; i++) {
    const block = await provider.getBlock(latestBlock.number - i);
    if (block && block.transactions) {
      for (const txHash of block.transactions) {
        const tx = await provider.getTransaction(txHash);
        if (tx && tx.gasPrice) gasPrices.push(Number(tx.gasPrice));
      }
    }
  }

  gasPrices.sort((a, b) => a - b);
  const mid = Math.floor(gasPrices.length / 2);
  const median = gasPrices.length % 2 === 0
    ? (gasPrices[mid - 1] + gasPrices[mid]) / 2
    : gasPrices[mid];

  console.log("Recommended Gas Price (wei):", median);
  return median;
}

estimateGasPrice();