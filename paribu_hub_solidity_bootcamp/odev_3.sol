// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

// To-Do Listesi Oluşturma

contract ToDoList{
    struct ToDo{
        string task;
        bool completeStatus;
    }

    ToDo[] public todos;

    // yeni to-do ekle ve tamamlanma durumunu false yap.
    function addNewToDo(string memory _task) public{
        todos.push(
            ToDo({
                task : _task,
                completeStatus : false
            })
        );
    }

    modifier outOfRange(uint8 index){
        require(index < todos.length, "index out of range"); // liste dışı elemana erişimi engelledik.
        _;
    }

    function toggleCompleteStatusAtIndex(uint8 index) outOfRange(index) public{
        todos[index].completeStatus = !todos[index].completeStatus;
    }

    function 

}