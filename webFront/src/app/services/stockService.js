angular.module('webFront').factory('StockService', ['$http', function ($http) {
  return {
    get: function (params, cb) {
      var url = '/api_v1.1/stocks';
      return $http.get( url,  { params: params }).success(function (data) {
        cb( data );
      });
    }
  }
}]);
