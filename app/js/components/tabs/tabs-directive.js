'use strict';

var tabs = angular.module('app.tabs.tabs-directive', []);


var TabsController = function ($scope, $element) {
    var panes = $scope.panes = [];

    $scope.select = function (pane) {
        angular.forEach(panes, function (pane) {
            pane.selected = false;
        });
        pane.selected = true;
    };

    this.addPane = function (pane) {
        if (!panes.length) $scope.select(pane);
        panes.push(pane);
    };
};

tabs.directive('tabs', function () {
    return {
        restrict: 'EA',
        transclude: true,
        scope: {},
        controller: TabsController,
        templateUrl: 'html/tabs/tabs.html',
        replace: true
    };
});


tabs.directive('pane', function () {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: {title: '@'},
        link: function (scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        templateUrl: 'html/tabs/pane.html',
        replace: true
    };
});
