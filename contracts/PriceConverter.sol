// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        //ABI
        //Address 0x694AA1769357215DE4FAC081bf1f309aDC325306
        (, int price, , , ) = priceFeed.latestRoundData();
        // ETH in terms of USD
        // 300.000000000
        return uint256(price * 1e10); // 1*10 == 10000000000
    }

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        // 3000_000000000000000000;
        // 1_0000000000000000 ETH
        uint256 ethAnountInUSD = (ethPrice * ethAmount) / 1e18;
        // 300
        return ethAnountInUSD;
    }
}
