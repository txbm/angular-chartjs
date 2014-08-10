'use strict';

var app = angular.module('demo-angular-chartjs', ['chartjs']);

(function () {
  'use strict';

  app.controller('TestCtrl', function ($scope) {
    $scope.lineChartData = {
      labels: [
        'Jan', 
        'Feb', 
        'Mar'
      ],
      datasets: [
        {
          data: [0, 5, 10, 15, 20, 25]
        },
        {
          data: [3, 6, 9, 12, 15, 18]
        }
      ]
    };
  });

})();