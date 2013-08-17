/// <reference path="_all.ts" />

module NameList.Controllers {

    "use strict";

    export class NameListController {

        public injection(): any[] {
            return [
                "$scope",
                "$dialog",
                "nameListService",
                NameListController
            ]
        }

        constructor(
            private $scope: NameList.Interfaces.INameListScope,
            private $dialog: any,
            private nameListService: NameList.Interfaces.INameListService) {

            $scope.model = new NameList.Models.NameListModel();
            $scope.model.items = <any>nameListService.query();
            $scope.onAddItem = () => this.onAddItem();
            $scope.onEditItem = (item: NameList.Models.Item) => this.onEditItem(item);
            $scope.onDeleteItem = (item: NameList.Models.Item) => this.onDeleteItem(item);
        }

        private onAddItem() {
            this.onEditItem(new NameList.Models.Item());
        }

        private onEditItem(item: NameList.Models.Item) {
            var self = this;
            var dialog = this.$dialog.dialog({
                modalFade: true,
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });
            dialog.open("AddItemDialog.html", "nameList.controllers.AddItemDialogController").then(function (result) {
                if (result) {
                    self.nameListService.save(item, function () {
                        self.$scope.model.items = <any>self.nameListService.query();
                    });
                }
            });
        }

        private onDeleteItem(item: NameList.Models.Item) {

            var self = this;

            var messageBox = this.$dialog.messageBox(
                "Delete Item " + item.Id,
                "Are you sure you want to delete this item?",
                [
                    { label: "Yes", result: true, cssClass: "btn-danger deleteYesBtn" },
                    { label: "No", result: false, cssClass: "deleteNoBtn" }
                ]);

            messageBox.open().then(function (result) {
                if (result) {
                    self.nameListService.remove(item, function () {
                        self.$scope.model.items = <any>self.nameListService.query();
                    });
                }
            });
        }
    }

    var app = angular.module("NameListApp");
    app.controller("nameList.controllers.NameListController", NameListController.prototype.injection());
}
