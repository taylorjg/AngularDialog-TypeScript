var NameList;
(function (NameList) {
    /// <reference path="_all.ts" />
    (function (Directives) {
        "use strict";

        // TODO: move this to a base class of JtRequiredFieldValidationError and JtEmailValidationError ?
        var _commonValidationErrorLinkFn = function ($scope, element, attributes, $interpolate, attributeName, errorProperty) {
            var form = element.closest("[data-ng-form]");
            var controlSelector = attributes[attributeName];
            var control = form.find(controlSelector);

            var formName = $(form[0]).attr("data-name");
            var controlName = $(control[0]).attr("data-name");

            var watchExpression = $interpolate("{{formName}}.submitAttempted && {{formName}}.{{controlName}}.$error.{{errorProperty}}")({
                formName: formName,
                controlName: controlName,
                errorProperty: errorProperty
            });

            $scope.$watch(watchExpression, function (newValue) {
                if (newValue) {
                    element.show();
                } else {
                    element.hide();
                }
            });
        };

        var JtRequiredFieldValidationError = (function () {
            function JtRequiredFieldValidationError($interpolate) {
                var _this = this;
                this.$interpolate = $interpolate;
                this.link = function ($scope, element, attributes) {
                    return _this.linkFn($scope, element, attributes);
                };
            }
            JtRequiredFieldValidationError.prototype.injection = function () {
                return [
                    "$interpolate",
                    function ($interpolate) {
                        return new JtRequiredFieldValidationError($interpolate);
                    }
                ];
            };

            JtRequiredFieldValidationError.prototype.linkFn = function ($scope, element, attributes) {
                _commonValidationErrorLinkFn($scope, element, attributes, this.$interpolate, "jtRequiredFieldValidationError", "required");
            };
            return JtRequiredFieldValidationError;
        })();
        Directives.JtRequiredFieldValidationError = JtRequiredFieldValidationError;

        var JtEmailValidationError = (function () {
            function JtEmailValidationError($interpolate) {
                var _this = this;
                this.$interpolate = $interpolate;
                this.link = function ($scope, element, attributes) {
                    return _this.linkFn($scope, element, attributes);
                };
            }
            JtEmailValidationError.prototype.injection = function () {
                return [
                    "$interpolate",
                    function ($interpolate) {
                        return new JtEmailValidationError($interpolate);
                    }
                ];
            };

            JtEmailValidationError.prototype.linkFn = function ($scope, element, attributes) {
                _commonValidationErrorLinkFn($scope, element, attributes, this.$interpolate, "jtEmailValidationError", "email");
            };
            return JtEmailValidationError;
        })();
        Directives.JtEmailValidationError = JtEmailValidationError;

        var app = angular.module("NameListApp");
        app.directive("jtRequiredFieldValidationError", JtRequiredFieldValidationError.prototype.injection());
        app.directive("jtEmailValidationError", JtEmailValidationError.prototype.injection());
    })(NameList.Directives || (NameList.Directives = {}));
    var Directives = NameList.Directives;
})(NameList || (NameList = {}));
//@ sourceMappingURL=jtValidationDirectives.js.map
