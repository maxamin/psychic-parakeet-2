
pragma solidity ^0.8.0;

import "./NaiveReceiverLenderPool.sol";
import "./FlashLoanReceiver.sol";
import "./Address.sol";

contract NaiveReceiverEchidna {
    using Address for address payable;

    // We will send ETHER_IN_POOL to the flash loan pool.
    uint256 constant ETHER_IN_POOL = 1000e18;
    // We will send ETHER_IN_RECEIVER to the flash loan receiver.
    uint256 constant ETHER_IN_RECEIVER = 10e18;

    NaiveReceiverLenderPool pool;
    FlashLoanReceiver receiver;

    // Setup echidna test by deploying the flash loan pool and receiver and sending them some ether.
    constructor() payable {
        pool = new NaiveReceiverLenderPool();
        receiver = new FlashLoanReceiver(payable(address(pool)));
        payable(address(pool)).sendValue(ETHER_IN_POOL);
        payable(address(receiver)).sendValue(ETHER_IN_RECEIVER);
    }

    // We want to test whether the balance of the receiver contract can be decreased.
    function echidna_test_contract_balance() public view returns (bool) {
        return address(receiver).balance >= 10 ether;
    }
}
/*
  SOLUTION 1
  WE NEED TO DRAIN ALL THE ETH FROM THE FLASHLOANRECEIVER CONTRACT .INITAIALY THE CONTRACT IS FUNDED WITH 10 ETH AND IT DOES NOT CHECK 
  WHETHER THE FLASH LOAN IS CALLED BY THE OWNER OR ATTACKER .SO WE CAN TAKE ADVANTAGE OF THIS AND DRAIN ALL THE ETH FROM THE CONTRACT
  SET THE ATTACK CONTRACT CALL THE NAVIEREC FLASH LOAN FUNCTION WITH BORROWER FLASHLOANRECIVER_CONTRACT WE CAN BY PASS THE balanceBefore >= borrowAmount
  BY PASSING 0 ETH ,CALL THE FUNCTION UNTIL WE DRAIN THE USER CONTRACT 
  function attack(NaiveReceiverLenderPool pool,address payable receiver) public {
    uint256 FIXED_FEE = pool.fixedFee();
    while (FLACHLOANRECIVER.balance >= FIXED_FEE) {
        pool.flashLoan(FLACHLOANRECIVER, 0);
    }
}
  
  SOLUTION 2(ONE SHOT)
  #### may be correct
  THE NAVIEREC FLASH LOAN FUNCTION WITH BORROWER FLASHLOANRECIVER_CONTRACT PASSING 0 ETH ,TRANSFER ALL THE ETH FROM THE 
  CONTRACT - 1 (SO THAT IT CAN PAY 1 ETH AS A FEE TO THE FLASHLOAN CONTRACT) TO THE ATTACKER
  C:\Users\VISHAL KULKARNI\Desktop\ech-dam-defi\damn-vulnerable-defi-echidna

  docker run -it --rm -v C:\ECH\ECH_PRATICE:/code  trailofbits/eth-security-toolbox
  /code/damn-vulnerable-defi-echidna/contracts/naive-receiver
  
  */