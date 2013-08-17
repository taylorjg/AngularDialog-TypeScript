var NameList;
(function (NameList) {
    /// <reference path="_all.ts" />
    (function (Directives) {
        "use strict";

        var JtSetFocus = (function () {
            function JtSetFocus($timeout) {
                var _this = this;
                this.$timeout = $timeout;
                this.link = function ($scope, element, attributes) {
                    return _this.linkFn($scope, element, attributes);
                };
            }
            JtSetFocus.prototype.injection = function () {
                return [
                    "$timeout",
                    function ($timeout) {
                        return new JtSetFocus($timeout);
                    }
                ];
            };

            JtSetFocus.prototype.linkFn = function ($scope, element, attributes) {
                var self = this;
                $scope.$watch(attributes.jtSetFocus, function (newValue) {
                    if (newValue) {
                        self.$timeout(function () {
                            element[0].focus();
                        }, 0, false);
                    }
                });
            };
            return JtSetFocus;
        })();
        Directives.JtSetFocus = JtSetFocus;

        var app = angular.module("NameListApp");
        app.directive("jtSetFocus", JtSetFocus.prototype.injection());
    })(NameList.Directives || (NameList.Directives = {}));
    var Directives = NameList.Directives;
})(NameList || (NameList = {}));
//@ sourceMappingURL=jtSetFocus.js.map
