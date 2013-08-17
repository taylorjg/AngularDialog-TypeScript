var NameList;
(function (NameList) {
    /// <reference path="_all.ts" />
    (function (Controllers) {
        "use strict";

        var AddItemDialogController = (function () {
            function AddItemDialogController($scope, dialog, item) {
                var _this = this;
                this.$scope = $scope;
                this.dialog = dialog;
                this.item = item;
                $scope.addItemDialogModel = new NameList.Models.AddItemDialogModel(item);
                $scope.setFocusToFirstNameField = true;
                $scope.dialogTitle = (item.Id) ? "Edit Item " + item.Id : "Add Item";
                $scope.onOk = function () {
                    return _this.onOk();
                };
                $scope.onCancel = function () {
                    return _this.onCancel();
                };
            }
            AddItemDialogController.prototype.injection = function () {
                return [
                    "$scope",
                    "dialog",
                    "item",
                    AddItemDialogController
                ];
            };

            AddItemDialogController.prototype.onOk = function () {
                var form = (this.$scope).form;
                form.mySubmitAttempted = true;
                if (form.$valid) {
                    this.dialog.close(true);
                }
            };

            AddItemDialogController.prototype.onCancel = function () {
                this.dialog.close(false);
            };
            return AddItemDialogController;
        })();
        Controllers.AddItemDialogController = AddItemDialogController;

        var app = angular.module("NameListApp");
        app.controller("nameList.controllers.AddItemDialogController", AddItemDialogController.prototype.injection());
    })(NameList.Controllers || (NameList.Controllers = {}));
    var Controllers = NameList.Controllers;
})(NameList || (NameList = {}));
//@ sourceMappingURL=AddItemDialogController.js.map
