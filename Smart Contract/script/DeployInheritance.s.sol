// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {Script} from "forge-std/Script.sol";
import {Inheritance} from "../src/Inheritance.sol";
import {InheritanceFactory} from "../src/InheritanceFactory.sol";

contract DeployInheritance is Script {
    function run() external returns (InheritanceFactory) {
        vm.startBroadcast();

        InheritanceFactory inheritanceFactory = new InheritanceFactory();
        vm.stopBroadcast();

        return inheritanceFactory;
    }
}