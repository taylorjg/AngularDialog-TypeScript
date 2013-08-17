var NameList;
(function (NameList) {
    /// <reference path="_all.ts" />
    (function (Services) {
        "use strict";

        var NameListService = (function () {
            function NameListService($resource, $q, $interpolate, $window) {
                this.$resource = $resource;
                this.$q = $q;
                this.$interpolate = $interpolate;
                this.$window = $window;
                var url = $interpolate("http://{{hostname}}\\:{{port}}/Api/NameList/:id")({
                    hostname: $window.location.hostname,
                    port: $window.location.port
                });

                this._resource = $resource(url, { id: "@Id" });
            }
            NameListService.prototype.injection = function () {
                return [
                    "$resource",
                    "$q",
                    "$interpolate",
                    "$window",
                    NameListService
                ];
            };

            NameListService.prototype.query = function (successFn, errorFn) {
                successFn = successFn || angular.noop;
                errorFn = errorFn || angular.noop;

                return this._resource.query(function (items) {
                    successFn(items);
                }, function (err) {
                    errorFn(err);
                });
            };

            NameListService.prototype.get = function (id, successFn, errorFn) {
                successFn = successFn || angular.noop;
                errorFn = errorFn || angular.noop;

                return this._resource.get({
                    id: id
                }, function (item) {
                    successFn(item);
                }, function (err) {
                    errorFn(err);
                });
            };

            NameListService.prototype.save = function (item, successFn, errorFn) {
                successFn = successFn || angular.noop;
                errorFn = errorFn || angular.noop;

                this._resource.save(item, function (item2) {
                    successFn(item2);
                }, function (err) {
                    errorFn(err);
                });
            };

            NameListService.prototype.remove = function (item, successFn, errorFn) {
                successFn = successFn || angular.noop;
                errorFn = errorFn || angular.noop;

                this._resource.remove({
                    id: item.Id
                }, function (x) {
                    successFn(x);
                }, function (err) {
                    errorFn(err);
                });
            };
            return NameListService;
        })();
        Services.NameListService = NameListService;

        var app = angular.module("NameListApp");
        app.service("nameListService", NameListService.prototype.injection());
    })(NameList.Services || (NameList.Services = {}));
    var Services = NameList.Services;
})(NameList || (NameList = {}));
//@ sourceMappingURL=NameListService.js.map
