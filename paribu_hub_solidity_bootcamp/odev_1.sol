// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract SayacOdev {
    int public sayac = 0;

    function sayacArttir() external {
        sayac += 1;
    }

    function sayacAzalt() external {
        sayac -= 1;
    }
}