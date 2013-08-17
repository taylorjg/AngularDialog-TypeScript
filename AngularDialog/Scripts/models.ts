/// <reference path='_all.ts' />

module NameList.Models {

    "use strict";

    export class Item {
        public Id: number;
        public FirstName: string;
        public LastName: string;
        public Email: string;
    }

    export class NameListModel {
        public items: Item[] = [];
    }

    export class AddItemDialogModel {
        public item: Item;
    }
}
