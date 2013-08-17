/// <reference path='_all.ts' />

module nameList.models {

    "use strict";

    export class Item {
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
