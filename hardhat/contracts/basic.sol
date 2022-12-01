pragma solidity ^0.8.9;

contract HelloWorld {
    string public msgVal;
    address public owner;

    constructor(){
        msgVal = "HelloWorld";
        // owner = msg.sender;
    }

    function getMsg() external view returns (string memory) {
        return msgVal;
    }

}