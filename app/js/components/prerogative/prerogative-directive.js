'use strict';

angular.module('app.prerogative.prerogative-directive', [])

    .directive('myPrerogative', [function () {

        return {
            restrict: 'EA',
            // template: '<button class="btn btn-primary" ng-model="perogative"  ng-click="updateButton()" ng-dblclick="dblClickUpdate()">{{perogative}}</button>',
            templateUrl: 'html/prerogative/prerogative.html',
            scope: true,
            controller: 'prerogativeCtl',
            link: function (scope, element, attrs) {

                scope.prerogative = 'Click Me';

                scope.updateButton = function () {
                    scope.prerogative = 'My Other Perogative';
                };

                scope.dblClickUpdate = function () {
                    scope.prerogative = 'My Other Other Perogative';
                };
            }
        };
    }])

    .controller('prerogativeCtl', ['$scope', function ($scope) {
        var vm = this;
        vm.greetings = 'Hello World!';
    }]);
