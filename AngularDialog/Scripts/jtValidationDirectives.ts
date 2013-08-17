/// <reference path="_all.ts" />

module NameList.Directives {

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

    export class JtRequiredFieldValidationError {

        public link: ($scope: ng.IScope, element: JQuery, attributes: any) => any;

        public injection(): any[] {
            return [
                "$interpolate",
                ($interpolate) => { return new JtRequiredFieldValidationError($interpolate); }
            ]
        }

        constructor(private $interpolate: ng.IInterpolateService) {
            this.link = ($scope, element, attributes) => this.linkFn($scope, element, attributes);
        }

        linkFn($scope: ng.IScope, element: JQuery, attributes: any): any {
            _commonValidationErrorLinkFn(
                $scope,
                element,
                attributes,
                this.$interpolate,
                "jtRequiredFieldValidationError",
                "required");
        }
    }

    export class JtEmailValidationError {

        public link: ($scope: ng.IScope, element: JQuery, attributes: any) => any;

        public injection(): any[] {
            return [
                "$interpolate",
                ($interpolate) => { return new JtEmailValidationError($interpolate); }
            ]
        }

        constructor(private $interpolate: ng.IInterpolateService) {
            this.link = ($scope, element, attributes) => this.linkFn($scope, element, attributes);
        }

        linkFn($scope: ng.IScope, element: JQuery, attributes: any): any {
            _commonValidationErrorLinkFn(
                $scope,
                element,
                attributes,
                this.$interpolate,
                "jtEmailValidationError",
                "email");
        }
    }

    var app = angular.module("NameListApp");
    app.directive("jtRequiredFieldValidationError", JtRequiredFieldValidationError.prototype.injection());
    app.directive("jtEmailValidationError", JtEmailValidationError.prototype.injection());
}
