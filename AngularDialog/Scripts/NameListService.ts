/// <reference path="_all.ts" />

module NameList.Services {

    "use strict";

    export class NameListService implements NameList.Interfaces.INameListService {

        private _resource: ng.resource.IResourceClass;

        public injection(): any[] {
            return [
                "$resource",
                "$q",
                "$interpolate",
                "$window",
                NameListService
            ]
        }

        constructor(
            private $resource: ng.resource.IResourceService,
            private $q: ng.IQService,
            private $interpolate: ng.IInterpolateService,
            private $window: ng.IWindowService) {

            var url: string = $interpolate("http://{{hostname}}\\:{{port}}/Api/NameList/:id")({
                hostname: $window.location.hostname,
                port: $window.location.port
            });

            this._resource = $resource(url, { id: "@Id" });
        }

        query(successFn?: Function, errorFn?: Function): ng.resource.IResource {

            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;

            return this._resource.query(
                function (items) {
                    successFn(items);
                }, function (err) {
                    errorFn(err);
                });
        }

        get(id: number, successFn?: Function, errorFn?: Function): ng.resource.IResource {

            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;

            return this._resource.get(
                {
                    id: id
                },
                function (item) {
                    successFn(item);
                },
                function (err) {
                    errorFn(err);
                });
        }

        save(item: NameList.Models.Item, successFn?: Function, errorFn?: Function): void {

            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;

            this._resource.save(
                item,
                function (item2) {
                    successFn(item2);
                },
                function (err) {
                    errorFn(err);
                });
        }

        remove(item: NameList.Models.Item, successFn?: Function, errorFn?: Function): void {

            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;

            this._resource.remove(
                {
                    id: item.Id
                },
                function (x) {
                    successFn(x);
                },
                function (err) {
                    errorFn(err);
                });
        }
    }

    var app = angular.module("NameListApp");
    app.service("nameListService", NameListService.prototype.injection());
}
