angular.module('uitest.form.results', ['ngRoute', 'uitest.form.service'])
  
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/form/results', {
      templateUrl: 'js/form/results/results.html',
      controller: 'ResultsController'
    });
  }])
  
  .controller('ResultsController', ['$rootScope', '$scope', 'FormService', function($rootScope, $scope, FormService) {
    'use strict';
    $rootScope.title = 'TestMe_lite results!';
    $scope.selected = FormService.selected;
  }]);