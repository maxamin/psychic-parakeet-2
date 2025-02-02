// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Attacker {
    uint256 public s_variable;
    uint256 public s_otherVar;

    function doSomething() public returns (bool) {
        s_variable = 123;
        s_otherVar = 1;
        return true;
    }

    function doSomethingElse() public returns (bool, bytes memory) {
        return (true, bytes(""));
    }

    function getOwner() external returns (address) {
        return address(0xC006562812F7Adf75FA0aDCE5f02C33E070e0ada);
    }

    function getSelector() public view returns (bytes4) {
        return this.doSomethingElse.selector;
    }
}