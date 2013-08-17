/// <reference path="_all.ts" />

//module todos {
//    'use strict';

//    export interface ITodoScope extends ng.IScope {
//        todos: TodoItem[];
//        newTodo: string;
//        editedTodo: TodoItem;
//        remainingCount: number;
//        doneCount: number;
//        allChecked: bool;
//        statusFilter: { completed: bool; };
//        location: ng.ILocationService;

//        addTodo: () => void;
//        editTodo: (todoItem: TodoItem) => void;
//        doneEditing: (todoItem: TodoItem) => void;
//        removeTodo: (todoItem: TodoItem) => void;
//        clearDoneTodos: () => void;
//        markAll: (completed: bool) => void;
//    }
//}

module NameList.Interfaces {

    export interface INameListScope extends ng.IScope {
        nameListModel: NameList.Models.NameListModel;
        onAddItem: () => void;
        onEditItem: (item: NameList.Models.Item) => void;
        onDeleteItem: (item: NameList.Models.Item) => void;
    }
}
