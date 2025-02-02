// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {Test, stdStorage, StdStorage} from "forge-std/test.sol";
import {Vm} from "forge-std/Vm.sol";

interface IERC20 {
    function balanceOf(address) external view returns (uint256);
}

contract Utilities is Test {
    bytes32 internal nextUser = keccak256(abi.encodePacked("user address"));
    // using stdStorage for StdStorage;
    // StdStorage internal stdstore;

    /// @notice Modifies the storage of a token to mint new tokens to an address.
    function writeTokenBalance(address who, address token, uint256 amt) external {
        this.tip(token, who, amt);
    }    

    function getNextUserAddress() external returns (address payable) {
        //bytes32 to address conversion
        address payable user = payable(address(uint160(uint256(nextUser))));
        nextUser = keccak256(abi.encodePacked(nextUser));
        return user;
    }

    /// @notice create users with 100 ether balance
    function createUsers(uint256 userNum)
        external
        returns (address payable[] memory)
    {
        address payable[] memory users = new address payable[](userNum);
        for (uint256 i = 0; i < userNum; i++) {
            address payable user = this.getNextUserAddress();
            this.deal(user, 100 ether);
            users[i] = user;
        }
        return users;
    }

    /// @notice move block.number forward by a given number of blocks
    function mineBlocks(uint256 numBlocks) external {
        uint256 targetBlock = block.number + numBlocks;
        vm.roll(targetBlock);
    }
}
