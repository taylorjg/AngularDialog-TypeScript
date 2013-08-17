/// <reference path="_all.ts" />

module NameList.Controllers {

    "use strict";

    export class AddItemDialogController {

        public injection(): any[] {
            return [
                "$scope",
                "dialog",
                "item",
                AddItemDialogController
            ]
        }

        constructor(
            private $scope: NameList.Interfaces.IAddItemDialogScope,
            private dialog: any,
            private item: NameList.Models.Item) {

            $scope.addItemDialogModel = new NameList.Models.AddItemDialogModel(item);
            $scope.setFocusToFirstNameField = true;
            $scope.dialogTitle = (item.Id) ? "Edit Item " + item.Id : "Add Item";
            $scope.onOk = () => this.onOk();
            $scope.onCancel = () => this.onCancel();
        }

        private onOk(): void {
            var form: NameList.Interfaces.IFormControllerExt = (<any>this.$scope).form;
            form.mySubmitAttempted = true;
            if (form.$valid) {
                this.dialog.close(true);
            }
        }

        private onCancel(): void {
            this.dialog.close(false);
        }
    }

    var app = angular.module("NameListApp");
    app.controller("nameList.controllers.AddItemDialogController", AddItemDialogController.prototype.injection());
}
