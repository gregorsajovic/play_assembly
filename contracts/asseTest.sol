// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract asseTest {
    mapping(address => uint256) values;

    function getValue(
        address _addr
    ) public pure returns (bytes32 storagePointer) {
        assembly {
            // storage address of mapping v[key] is at keccak256(key . (v's slot)), where dot is concatenation

            // prepare memory slot
            let m := mload(0x20)
            mstore(m, _addr) // add address in the first slot
            mstore(add(m, 0x20), values.slot) // add values slot in the second slot
            // note: given that we have only one variable, this line could be omitted, since values.slot == 0.
            // It slightly reduces gas consumption (around 10 gas), but is potentially unsafe

            storagePointer := keccak256(m, 0x40) // calcualte memory slot and assing it to return variable.
        }
    }

    function setTestValue(address add, uint256 v) external {
        console.log(
            "Value %s will be inserted into mapping at address: %s",
            v,
            add
        );
        values[add] = v;
    }
}
