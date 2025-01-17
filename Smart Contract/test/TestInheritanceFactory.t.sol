// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {Inheritance} from "../src/Inheritance.sol";
import {InheritanceFactory} from "../src/InheritanceFactory.sol";

contract TestInheritanceFactory is Test {
    InheritanceFactory inheritanceFactory;

    function setUp() public {
        inheritanceFactory = new InheritanceFactory();
    }

    function test_createInheritance() public {
        inheritanceFactory.createInheritance(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
    }

    function test_getInheritanceContractByUser() public {
        inheritanceFactory.createInheritance(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);

        Inheritance[] memory inheritanceContractArray = inheritanceFactory.getInheritanceContractByUser(address(this));

        console.log("This is the Address: ", address(inheritanceContractArray[0]));
        assertEq(address(inheritanceContractArray[0]), address(inheritanceFactory.allInheritanceContracts(0)), "OK");
    }

    function test_getAllInheritanceContracts() public {
        inheritanceFactory.createInheritance(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);

        Inheritance[] memory inheritanceAllContracts = inheritanceFactory.getAllInheritanceContracts();
        console.log(address(inheritanceAllContracts[0]));
        assertEq(address(inheritanceAllContracts[0]), address(inheritanceFactory.allInheritanceContracts(0)), "OK");
    }
}