angular.module('uitest', ['ngRoute', 'uitest.form'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/form'
    });
  }]);