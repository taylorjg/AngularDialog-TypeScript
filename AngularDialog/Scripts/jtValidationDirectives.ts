/// <reference path="_all.ts" />

module NameList.Directives {

    "use strict";

    export class JtValidationBase {

        constructor(
            private $interpolate: ng.IInterpolateService,
            private attributeName: string,
            private errorPropertyName: string) {
        }

        linkFn($scope, element, attributes) {

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
        }
    }

    export class JtRequiredFieldValidationError extends JtValidationBase {

        public link: ($scope: ng.IScope, element: JQuery, attributes: any) => any;

        public injection(): any[] {
            return [
                "$interpolate",
                ($interpolate) => { return new JtRequiredFieldValidationError($interpolate); }
            ]
        }

        constructor($interpolate: ng.IInterpolateService) {
            super($interpolate, "jtRequiredFieldValidationError", "required");
            this.link = ($scope, element, attributes) => this.linkFn($scope, element, attributes);
        }

        linkFn($scope: ng.IScope, element: JQuery, attributes: any): any {
            super.linkFn($scope, element, attributes);
        }
    }

    export class JtEmailValidationError extends JtValidationBase {

        public link: ($scope: ng.IScope, element: JQuery, attributes: any) => any;

        public injection(): any[] {
            return [
                "$interpolate",
                ($interpolate) => { return new JtEmailValidationError($interpolate); }
            ]
        }

        constructor($interpolate: ng.IInterpolateService) {
            super($interpolate, "jtEmailValidationError", "email");
            this.link = ($scope, element, attributes) => this.linkFn($scope, element, attributes);
        }

        linkFn($scope: ng.IScope, element: JQuery, attributes: any): any {
            super.linkFn($scope, element, attributes);
        }
    }

    var app = angular.module("NameListApp");
    app.directive("jtRequiredFieldValidationError", JtRequiredFieldValidationError.prototype.injection());
    app.directive("jtEmailValidationError", JtEmailValidationError.prototype.injection());
}
