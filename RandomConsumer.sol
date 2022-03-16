//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/master/evm-contracts/src/v0.6/VRFConsumerBase.sol";
import "./IRandom.sol";

contract RandomNumberConsumer is VRFConsumerBase, IRandom {
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
}