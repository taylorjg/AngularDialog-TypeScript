/// <reference path="_all.ts" />

module NameList.Directives {

    "use strict";

    export class JtSetFocus implements ng.IDirective {

        public link: ($scope: ng.IScope, element: JQuery, attributes: any) => any;

        public injection(): any[] {
            return [
                "$timeout",
                ($timeout) => { return new JtSetFocus($timeout); }
            ]
        }

        constructor(private $timeout: ng.ITimeoutService) {
            this.link = ($scope, element, attributes) => this.linkFn($scope, element, attributes);
        }

        private linkFn($scope: ng.IScope, element: JQuery, attributes: any): any {
            var self = this;
            $scope.$watch(attributes.jtSetFocus, function (newValue) {
                if (newValue) {
                    self.$timeout(() => {
                        element[0].focus();
                    }, 0, false);
                }
            });
        }
    }

    var app = angular.module("NameListApp");
    app.directive("jtSetFocus", JtSetFocus.prototype.injection());
}
