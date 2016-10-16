'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'ngResource',
    'app.view1',
    'app.view2',
    'app.version',
    'app.tabs',
    'app.prerogative'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}])
    .controller('BeerCounter', function ($scope, $locale) {
        $scope.beers = [0, 1, 2, 3, 4, 5, 6];
        if ($locale.id == 'en-us') {
            $scope.beerForms = {
                0: 'no beers',
                one: '{} beer',
                other: '{} beers'
            };
        } else {
            $scope.beerForms = {
                0: 'žiadne pivo',
                one: '{} pivo',
                few: '{} pivá',
                other: '{} pív'
            };
        }
    });
