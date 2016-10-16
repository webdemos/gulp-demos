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
