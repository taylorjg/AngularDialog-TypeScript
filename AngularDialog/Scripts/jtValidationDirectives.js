var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NameList;
(function (NameList) {
    /// <reference path="_all.ts" />
    (function (Directives) {
        "use strict";

        var JtValidationBase = (function () {
            function JtValidationBase($interpolate, attributeName, errorPropertyName) {
                this.$interpolate = $interpolate;
                this.attributeName = attributeName;
                this.errorPropertyName = errorPropertyName;
            }
            JtValidationBase.prototype.linkFn = function ($scope, element, attributes) {
                var form = element.closest("[data-ng-form]");
                var controlSelector = attributes[this.attributeName];
                var control = form.find(controlSelector);

                var formName = $(form[0]).attr("data-name");
                var controlName = $(control[0]).attr("data-name");

                var watchExpression = this.$interpolate("{{formName}}.submitAttempted && {{formName}}.{{controlName}}.$error.{{errorPropertyName}}")({
                    formName: formName,
                    controlName: controlName,
                    errorPropertyName: this.errorPropertyName
                });

                $scope.$watch(watchExpression, function (newValue) {
                    if (newValue) {
                        element.show();
                    } else {
                        element.hide();
                    }
                });
            };
            return JtValidationBase;
        })();
        Directives.JtValidationBase = JtValidationBase;

        var JtRequiredFieldValidationError = (function (_super) {
            __extends(JtRequiredFieldValidationError, _super);
            function JtRequiredFieldValidationError($interpolate) {
                var _this = this;
                _super.call(this, $interpolate, "jtRequiredFieldValidationError", "required");
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
                _super.prototype.linkFn.call(this, $scope, element, attributes);
            };
            return JtRequiredFieldValidationError;
        })(JtValidationBase);
        Directives.JtRequiredFieldValidationError = JtRequiredFieldValidationError;

        var JtEmailValidationError = (function (_super) {
            __extends(JtEmailValidationError, _super);
            function JtEmailValidationError($interpolate) {
                var _this = this;
                _super.call(this, $interpolate, "jtEmailValidationError", "email");
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
                _super.prototype.linkFn.call(this, $scope, element, attributes);
            };
            return JtEmailValidationError;
        })(JtValidationBase);
        Directives.JtEmailValidationError = JtEmailValidationError;

        var app = angular.module("NameListApp");
        app.directive("jtRequiredFieldValidationError", JtRequiredFieldValidationError.prototype.injection());
        app.directive("jtEmailValidationError", JtEmailValidationError.prototype.injection());
    })(NameList.Directives || (NameList.Directives = {}));
    var Directives = NameList.Directives;
})(NameList || (NameList = {}));
//@ sourceMappingURL=jtValidationDirectives.js.map
