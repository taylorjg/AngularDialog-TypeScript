var NameList;
(function (NameList) {
    /// <reference path='_all.ts' />
    (function (Models) {
        "use strict";

        var Item = (function () {
            function Item() {
            }
            return Item;
        })();
        Models.Item = Item;

        var NameListModel = (function () {
            function NameListModel() {
                this.items = [];
            }
            return NameListModel;
        })();
        Models.NameListModel = NameListModel;

        var AddItemDialogModel = (function () {
            function AddItemDialogModel() {
            }
            return AddItemDialogModel;
        })();
        Models.AddItemDialogModel = AddItemDialogModel;
    })(NameList.Models || (NameList.Models = {}));
    var Models = NameList.Models;
})(NameList || (NameList = {}));
//@ sourceMappingURL=models.js.map
