angular.module('uitest.form.service', [])
  .service('FormService', ['$http', function($http) {
    var selected = {};
    
    var getCheckboxes = function() {
      return $http({
        url: '/data/checkboxes.json'
      })
      .then(function(response) {
        return response.data.checkboxes.sort();
      });
    };

    return {
      getCheckboxes: getCheckboxes,
      selected: selected
    };
  }]);