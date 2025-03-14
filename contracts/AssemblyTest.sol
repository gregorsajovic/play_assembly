// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract AssemblyTest {
    mapping(address => uint256) values;

    constructor() {
        values[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2] = 33;
        values[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db] = 44;
        values[0x93f8dddd876c7dBE3323723500e83E202A7C96CC] = 55;
        values[0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC] = 66;
    }

    function memAbiEnc(
        address _addr
    )
        public
        view
        returns (
            // bytes32 ptr,
            // bytes32 valSlot,
            bytes32 slot,
            bytes32 addrSlot1,
            bytes32 addrSlot2,
            bytes32 addrLoc,
            uint256 addrVal
        )
    {
        // bytes32 private valSlot;
        assembly {
            let ptr := mload(0x40)
            let valSlot := values.slot
            mstore(ptr, _addr)
            mstore(add(ptr, 0x20), valSlot)

            slot := mload(0x40)
            addrSlot1 := mload(0x80)
            addrSlot2 := mload(0xa0)

            addrLoc := keccak256(0x80, 0x40)
            addrVal := sload(addrLoc)
        }
    }

    function saveNumberAtSlot(
        address _address,
        uint256 _value
    ) public returns (address savedAddress, bytes32 sltLoc) {
        values[_address] = _value;
        assembly {
            let ptr := mload(0x40)
            let valSlot := values.slot
            mstore(ptr, _address)
            mstore(add(ptr, 0x20), valSlot)
            let slot := mload(0x40)
            sltLoc := keccak256(slot, 0x40)
        }
        savedAddress = _address;
    }

    function testPrintSlot(bytes32 _value) public view returns (uint256 value) {
        assembly {
            value := sload(_value)
        }
    }
}
