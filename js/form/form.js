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
    $scope.selected = {};
    $scope.selectAll = false;
    
    // TODO: handle network failure
    FormService.getCheckboxes().then(function(checkboxes) {
      $scope.checkboxes = checkboxes;
      $scope.updateSelectAll();
    });

    $scope.submit = function() {
      if (numChecked() === 1 && $scope.selected['Language']) {
        $scope.showError = true;
      } else {
        FormService.selected = $scope.selected;
        $location.path('/form/results');
      }
    };

    $scope.updateSelectAll = function() {
      var num = numChecked();
      $scope.selectAll = !!num;
      if (num && num < $scope.checkboxes.length) {
        document.getElementById("select-all").indeterminate = true;
      }
    };

    $scope.bulkSelect = function() {
      angular.forEach($scope.checkboxes, function (checkbox) {
        $scope.selected[checkbox] = $scope.selectAll;
      });
    };

    function numChecked() {
      var num = 0;
      for (var key in $scope.selected) {
        if ($scope.selected.hasOwnProperty(key) && $scope.selected[key]) {
          num++;
        }
      }
      return num;
    }

  }]);