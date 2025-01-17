// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {Inheritance} from "../src/Inheritance.sol";

contract TestInheritance is Test {
    Inheritance inheritance;

    function setUp() public {
        inheritance = new Inheritance(address(this), 0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
    }

    function test_deposit() public {
        vm.deal(address(this), 1000 ether);
        inheritance.deposit{value: 10 ether}();
        uint balanceOfContract = address(inheritance).balance / 10 ** 18;

        assertEq(balanceOfContract, 10, "OK");
    }

    function test_getInheritorStatus() public view {
        bool status = inheritance.getInheritorStatus(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);

        assertEq(status, true, "OK");
    }

    function test_addInheritor() public {
        inheritance.addInheritor(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

        bool status = inheritance.getInheritorStatus(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

        assertEq(status, true, "OK");  
    }

    function test_removeInheritor() public {
        inheritance.removeInheritor(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);

        bool status = inheritance.getInheritorStatus(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);

        assertEq(status, false, "OK");
    }

    function test_resetTimeContract() public {
        uint creationTime = inheritance.creationTime();
        console.log("This is the creation Time: ", creationTime);

        vm.warp(block.timestamp + 100000);

        inheritance.resetContractTime();

        uint latestCreationTime = inheritance.creationTime();
        console.log("This is the latest creation Time: ", latestCreationTime);

        assertEq(latestCreationTime, block.timestamp, "OK");
    }

    function test_getTheETHForInheritors() public {
        vm.deal(address(this), 1000 ether);
        inheritance.deposit{value: 10 ether}();
        uint balanceOfContract = address(inheritance).balance / 10 ** 18;

        assertEq(balanceOfContract, 10, "OK");

        vm.warp(block.timestamp + 2592000 + 1);

        vm.startPrank(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        inheritance.getTheEthForInheritors(5 ether);

        assertEq(address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8).balance, 5 ether, "OK");
    }

    function test_getRemainingTime() public {
        uint remainingTime = inheritance.getRemainingTime();
        console.log("Remaining Time: ", remainingTime);

        vm.warp(block.timestamp + 2592000 + 1);

        uint remainingTimeForContract = inheritance.getRemainingTime();

        assertEq(remainingTimeForContract, 0, "OK");
    }
}