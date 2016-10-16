'use strict';

angular.module('app.common.services', [])
    
    .service('versionDao', ['$q', '$resource', function($q, $resource) {
      
        function getAuthors() {
        
            var req = $resource('fixtures/api/html2js/authors.json', {}, {
                query: {method: 'GET'}
            });
        
            var deferred = $q.defer();
        
            function successHandler (data) {
                deferred.resolve(data);
            }
        
            function errorHandler (data) {
                deferred.reject(data);
            }
        
            req.query(successHandler, errorHandler);
        
        
            return deferred.promise;
        }
      
        return {
            getAuthors: getAuthors
        };
    }])
    .factory('Notes', ['$resource', function ($resource) {
      
        function getNoteByID() {
            return $resource('/notes/:id');
        }
      
        return {
            getNoteByID: getNoteByID
        };
      
    }])
;
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

'use strict';

angular.module('app.prerogative', [
    'app.prerogative.prerogative-directive'
]);

'use strict';

angular.module('app.version.interpolate-filter', [])
    .filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);

'use strict';

angular.module('app.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
}]);

'use strict';

angular.module('app.version', [
    'app.version.interpolate-filter',
    'app.version.version-directive'
])

.value('version', '0.1');

'use strict';

angular.module('app.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'html/view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', function() {
  
});
'use strict';

angular.module('app.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'html/view2/view2.html',
        controller: 'View2Ctrl'
    });
}])

.controller('View2Ctrl', [function() {

}]);
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

'use strict';

angular.module('app.tabs', [
    'app.tabs.tabs-directive'
]);

/**
 * Created by dachao.chen on 5/22/2016.
 */
