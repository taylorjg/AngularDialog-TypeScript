/// <reference path="_all.ts" />

module NameList.Interfaces {

    export interface INameListScope extends ng.IScope {
        model: NameList.Models.NameListModel;
        onAddItem: () => void;
        onEditItem: (item: NameList.Models.Item) => void;
        onDeleteItem: (item: NameList.Models.Item) => void;
    }

    export interface INameListService {
        query: (successFn?: Function, errorFn?: Function) => ng.resource.IResource;
        get: (id: number, successFn?: Function, errorFn?: Function) => ng.resource.IResource;
        save: (item: NameList.Models.Item, successFn?: Function, errorFn?: Function) => void;
        remove: (item: NameList.Models.Item, successFn?: Function, errorFn?: Function) => void;
    }

    export interface IAddItemDialogScope {
        model: NameList.Models.AddItemDialogModel;
        setFocusToFirstNameField: boolean;
        dialogTitle: string;
        onOk: () => void;
        onCancel: () => void;
    }

    export interface IFormControllerExt extends ng.IFormController {
        mySubmitAttempted: boolean;
    }
}
