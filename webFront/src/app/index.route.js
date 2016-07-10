(function() {
  'use strict';

  angular
    .module('webFront')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/stock', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/org', {
        templateUrl: 'app/components/org/org.html',
        controller: 'OrgController',
        controllerAs: 'org'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
