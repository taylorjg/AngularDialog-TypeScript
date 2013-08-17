var nameList;
(function (nameList) {
    /// <reference path='_all.ts' />
    (function (models) {
        "use strict";

        var Item = (function () {
            function Item() {
            }
            return Item;
        })();
        models.Item = Item;

        var NameListModel = (function () {
            function NameListModel() {
                this.items = [];
            }
            return NameListModel;
        })();
        models.NameListModel = NameListModel;

        var AddItemDialogModel = (function () {
            function AddItemDialogModel() {
            }
            return AddItemDialogModel;
        })();
        models.AddItemDialogModel = AddItemDialogModel;
    })(nameList.models || (nameList.models = {}));
    var models = nameList.models;
})(nameList || (nameList = {}));
//@ sourceMappingURL=models.js.map
