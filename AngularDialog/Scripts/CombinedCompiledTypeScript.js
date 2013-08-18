var NameList;
(function (NameList) {
    (function (Models) {
        "use strict";

        var Item = (function () {
            function Item() {
            }
            return Item;
        })();
        Models.Item = Item;

        var NameListModel = (function () {
            function NameListModel() {
                this.items = [];
            }
            return NameListModel;
        })();
        Models.NameListModel = NameListModel;

        var AddItemDialogModel = (function () {
            function AddItemDialogModel(item) {
                this.item = item;
            }
            return AddItemDialogModel;
        })();
        Models.AddItemDialogModel = AddItemDialogModel;
    })(NameList.Models || (NameList.Models = {}));
    var Models = NameList.Models;
})(NameList || (NameList = {}));
var NameList;
(function (NameList) {
    "use strict";
    angular.module("NameListApp", ["ngResource", "ui", "ui.bootstrap"]);
})(NameList || (NameList = {}));
var NameList;
(function (NameList) {
    (function (Controllers) {
        "use strict";

        var AddItemDialogController = (function () {
            function AddItemDialogController($scope, dialog, item) {
                var _this = this;
                this.$scope = $scope;
                this.dialog = dialog;
                this.item = item;
                $scope.model = new NameList.Models.AddItemDialogModel(item);
                $scope.setFocusToFirstNameField = true;
                $scope.dialogTitle = (item.Id) ? "Edit Item " + item.Id : "Add Item";
                $scope.onOk = function () {
                    return _this.onOk();
                };
                $scope.onCancel = function () {
                    return _this.onCancel();
                };
            }
            AddItemDialogController.prototype.injection = function () {
                return [
                    "$scope",
                    "dialog",
                    "item",
                    AddItemDialogController
                ];
            };

            AddItemDialogController.prototype.onOk = function () {
                var form = (this.$scope).form;
                form.submitAttempted = true;
                if (form.$valid) {
                    this.dialog.close(true);
                }
            };

            AddItemDialogController.prototype.onCancel = function () {
                this.dialog.close(false);
            };
            return AddItemDialogController;
        })();
        Controllers.AddItemDialogController = AddItemDialogController;

        var app = angular.module("NameListApp");
        app.controller("nameList.controllers.AddItemDialogController", AddItemDialogController.prototype.injection());
    })(NameList.Controllers || (NameList.Controllers = {}));
    var Controllers = NameList.Controllers;
})(NameList || (NameList = {}));
var NameList;
(function (NameList) {
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NameList;
(function (NameList) {
    (function (Directives) {
        "use strict";

        var JtValidationBase = (function () {
            function JtValidationBase($interpolate, attributeName, errorPropertyName) {
                var _this = this;
                this.$interpolate = $interpolate;
                this.attributeName = attributeName;
                this.errorPropertyName = errorPropertyName;
                this.link = function ($scope, element, attributes) {
                    return _this.linkFn($scope, element, attributes);
                };
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
                _super.call(this, $interpolate, "jtRequiredFieldValidationError", "required");
            }
            JtRequiredFieldValidationError.prototype.injection = function () {
                return [
                    "$interpolate",
                    function ($interpolate) {
                        return new JtRequiredFieldValidationError($interpolate);
                    }
                ];
            };
            return JtRequiredFieldValidationError;
        })(JtValidationBase);
        Directives.JtRequiredFieldValidationError = JtRequiredFieldValidationError;

        var JtEmailValidationError = (function (_super) {
            __extends(JtEmailValidationError, _super);
            function JtEmailValidationError($interpolate) {
                _super.call(this, $interpolate, "jtEmailValidationError", "email");
            }
            JtEmailValidationError.prototype.injection = function () {
                return [
                    "$interpolate",
                    function ($interpolate) {
                        return new JtEmailValidationError($interpolate);
                    }
                ];
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
var NameList;
(function (NameList) {
    (function (Controllers) {
        "use strict";

        var NameListController = (function () {
            function NameListController($scope, $dialog, nameListService) {
                var _this = this;
                this.$scope = $scope;
                this.$dialog = $dialog;
                this.nameListService = nameListService;
                $scope.model = new NameList.Models.NameListModel();
                $scope.model.items = nameListService.query();
                $scope.onAddItem = function () {
                    return _this.onAddItem();
                };
                $scope.onEditItem = function (item) {
                    return _this.onEditItem(item);
                };
                $scope.onDeleteItem = function (item) {
                    return _this.onDeleteItem(item);
                };
            }
            NameListController.prototype.injection = function () {
                return [
                    "$scope",
                    "$dialog",
                    "nameListService",
                    NameListController
                ];
            };

            NameListController.prototype.onAddItem = function () {
                this.onEditItem(new NameList.Models.Item());
            };

            NameListController.prototype.onEditItem = function (item) {
                var self = this;
                var dialog = this.$dialog.dialog({
                    modalFade: true,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });
                dialog.open("AddItemDialog.html", "nameList.controllers.AddItemDialogController").then(function (result) {
                    if (result) {
                        self.nameListService.save(item, function () {
                            self.$scope.model.items = self.nameListService.query();
                        });
                    }
                });
            };

            NameListController.prototype.onDeleteItem = function (item) {
                var self = this;

                var messageBox = this.$dialog.messageBox("Delete Item " + item.Id, "Are you sure you want to delete this item?", [
                    { label: "Yes", result: true, cssClass: "btn-danger deleteYesBtn" },
                    { label: "No", result: false, cssClass: "deleteNoBtn" }
                ]);

                messageBox.open().then(function (result) {
                    if (result) {
                        self.nameListService.remove(item, function () {
                            self.$scope.model.items = self.nameListService.query();
                        });
                    }
                });
            };
            return NameListController;
        })();
        Controllers.NameListController = NameListController;

        var app = angular.module("NameListApp");
        app.controller("nameList.controllers.NameListController", NameListController.prototype.injection());
    })(NameList.Controllers || (NameList.Controllers = {}));
    var Controllers = NameList.Controllers;
})(NameList || (NameList = {}));
var NameList;
(function (NameList) {
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
