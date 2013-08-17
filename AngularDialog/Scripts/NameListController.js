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
                alert("onEditItem: " + item.Id);
            };

            NameListController.prototype.onDeleteItem = function (item) {
                alert("onDeleteItem: " + item.Id);
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
