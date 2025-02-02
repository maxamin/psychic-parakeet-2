// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Attacker.sol";
import "../src/Contract.sol";

contract AttackerTest is Test {
    Attacker attacker;

    function setUp() public {
        attacker = new Attacker();
    }

    function testMintNft() public {
        VulnerableContract vulnerableContract = new VulnerableContract();
        CourseCompletedNFT courseCompletedNFT = new CourseCompletedNFT(address(vulnerableContract));
        vm.startPrank(address(0xC006562812F7Adf75FA0aDCE5f02C33E070e0ada));
        courseCompletedNFT.mintNft(address(attacker), attacker.doSomethingElse.selector);
        assertEq(courseCompletedNFT.balanceOf(address(0xC006562812F7Adf75FA0aDCE5f02C33E070e0ada)), 1);
    }
}
