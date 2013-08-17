var NameList;
(function (NameList) {
    /// <reference path="_all.ts" />
    (function (Controllers) {
        "use strict";

        var NameListController = (function () {
            function NameListController($scope, $dialog, nameListService) {
                var _this = this;
                this.$scope = $scope;
                this.$dialog = $dialog;
                this.nameListService = nameListService;
                $scope.nameListModel = new NameList.Models.NameListModel();
                $scope.nameListModel.items = nameListService.query();
                $scope.onAddItem = function () {
                    return _this.onAddItem();
                };
                $scope.onEditItem = function (item) {
                    return _this.onEditItem(item);
                };
                $scope.onDeleteItem = function (item) {
                    return _this.onDeleteItem(item);
                };
            }
            NameListController.prototype.injection = function () {
                return [
                    "$scope",
                    "$dialog",
                    "nameListService",
                    NameListController
                ];
            };

            NameListController.prototype.onAddItem = function () {
                this.onEditItem(new NameList.Models.Item());
            };

            NameListController.prototype.onEditItem = function (item) {
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
                            self.$scope.nameListModel.items = self.nameListService.query();
                        });
                    }
                });
            };

            NameListController.prototype.onDeleteItem = function (item) {
                var self = this;

                var messageBox = this.$dialog.messageBox("Delete Item " + item.Id, "Are you sure you want to delete this item?", [
                    { label: "Yes", result: true, cssClass: "btn-danger deleteYesBtn" },
                    { label: "No", result: false, cssClass: "deleteNoBtn" }
                ]);

                messageBox.open().then(function (result) {
                    if (result) {
                        self.nameListService.remove(item, function () {
                            self.$scope.nameListModel.items = self.nameListService.query();
                        });
                    }
                });
            };
            return NameListController;
        })();
        Controllers.NameListController = NameListController;

        var app = angular.module("NameListApp");
        app.controller("nameList.controllers.NameListController", NameListController.prototype.injection());
    })(NameList.Controllers || (NameList.Controllers = {}));
    var Controllers = NameList.Controllers;
})(NameList || (NameList = {}));
//@ sourceMappingURL=NameListController.js.map
