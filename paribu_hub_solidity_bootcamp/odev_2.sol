//SPDX-License-Identifier: MIT
pragma solidity ^0.8;

// bağış toplama ile ilgili bir akıllı sözleşme oluşturacağız

contract Collecter{
    address public owner;
    uint256 public balance;

    constructor(){
        owner = msg.sender; // akıllı sözleşmenin sahibini sözleşmeyi kuran kişi olarak belirle.
    }

    receive() payable external {
        balance += msg.value;
    }

    function withdraw(uint256 amount, address payable _to) public{
        // sadece akıllı sözleşmeyi oluşturanın sermayeden token alabilmesini sağladık
        require(msg.sender == owner, "only owner can make transactions");
        // sermayedeki token kadar çekebilmemizi kısıtladık
        require(amount <= balance, "amount must be lesser or equal to balance");

        _to.transfer(amount);
        balance -= amount;
    }
}