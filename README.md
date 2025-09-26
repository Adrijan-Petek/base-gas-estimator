# Base Gas Price Estimator

This project provides a Base-specific gas price estimator using:
- An off-chain Node.js script (`estimateGas.js`) to compute median gas from recent blocks.
- An optional on-chain smart contract (`BaseGasOracle.sol`) for other contracts to query recommended gas prices.

## Setup

1. **Clone Repo**:
```bash
git clone <repo_url>
cd base-gas-estimator
```

2. **Install Dependencies**:
```bash
npm install
cp .env.example .env
```
Fill in `.env` with your `PRIVATE_KEY` and `BASESCAN_API_KEY`.

3. **Run Gas Estimator Script**:
```bash
npm run estimate
```

4. **Deploy Gas Oracle (Optional)**:
```bash
npx hardhat run scripts/deployOracle.js --network baseSepolia
```

5. **CI / Workflows**:
- GitHub Actions runs the estimator on push/pull request as demo.
