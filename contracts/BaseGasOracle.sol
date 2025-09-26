// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BaseGasOracle {
    uint256 public constant MAX_SAMPLES = 100;
    uint256[] public gasPrices;
    uint256 public total;

    function submitGasPrice(uint256 gasPrice) external {
        if (gasPrices.length < MAX_SAMPLES) {
            gasPrices.push(gasPrice);
            total += gasPrice;
        } else {
            uint256 index = block.number % MAX_SAMPLES;
            total = total - gasPrices[index] + gasPrice;
            gasPrices[index] = gasPrice;
        }
    }

    function getGasPrice() external view returns (uint256) {
        if (gasPrices.length == 0) return block.basefee;
        return total / gasPrices.length;
    }

    function getSamples() external view returns (uint256[] memory) {
        return gasPrices;
    }
}