// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Inheritance.sol";

contract InheritanceFactory {

    Inheritance[] public allInheritanceContracts;

    mapping(address => Inheritance[]) public userInheritanceContracts;

    event InheritanceContractCreated(address indexed owner, address contractAddress);

    function createInheritance(address inheritor) public {

        Inheritance newInheritance = new Inheritance(msg.sender, inheritor);

        allInheritanceContracts.push(newInheritance);

        userInheritanceContracts[msg.sender].push(newInheritance);

        emit InheritanceContractCreated(msg.sender, address(newInheritance));
    }


    function getInheritanceContractByUser(address _user) public view returns (Inheritance[] memory) {
        return userInheritanceContracts[_user];
    }

    function getAllInheritanceContracts() public view returns(Inheritance[] memory) {
        return allInheritanceContracts;
    }
}