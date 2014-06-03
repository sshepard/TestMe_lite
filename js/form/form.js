angular.module('uitest.form', ['ngRoute', 'uitest.form.results', 'uitest.form.service'])
  
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/form', {
      templateUrl: 'js/form/form.html',
      controller: 'FormController'
    });
  }])
  
  .controller('FormController', ['$rootScope', '$scope', '$location', 'FormService', function($rootScope, $scope, $location, FormService) {
    'use strict';
    
    $rootScope.title = 'TestMe_lite';
    $scope.selected = FormService.selected;
    $scope.selectAll = false;
    
    // Get checkboxes
    // TODO: handle network failure
    FormService.getCheckboxes().then(function(checkboxes) {
      $scope.checkboxes = checkboxes;
    });

    $scope.submit = function() {
      FormService.selected = $scope.selected;
      $location.path('/form/results');
    };

    $scope.updateSelectAll = function() {
      var numChecked = $('input[name=fields]:checked').length;
      $scope.selectAll = !!numChecked;
      if (numChecked && numChecked < $scope.checkboxes.length) {
        $("#select-all").prop('indeterminate', true);
      }
    };

    $scope.bulkSelect = function() {
      angular.forEach($scope.checkboxes, function (checkbox) {
        $scope.selected[checkbox] = $scope.selectAll;
      });
    };

  }]);