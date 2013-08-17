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
            private nameListService: any) {

            $scope.nameListModel = new NameList.Models.NameListModel();
            $scope.nameListModel.items = nameListService.query();
            $scope.onAddItem = () => this.onAddItem();
            $scope.onEditItem = (item: NameList.Models.Item) => this.onEditItem(item);
            $scope.onDeleteItem = (item: NameList.Models.Item) => this.onDeleteItem(item);
        }

        private onAddItem() {
            this.onEditItem(new NameList.Models.Item());
        }

        private onEditItem(item: NameList.Models.Item) {
            alert("onEditItem: " + item.Id);
        }

        private onDeleteItem(item: NameList.Models.Item) {
            alert("onDeleteItem: " + item.Id);
        }
    }

    var app = angular.module("NameListApp");
    app.controller("nameList.controllers.NameListController", NameListController.prototype.injection());
}
