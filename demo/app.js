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
    
    $scope.lineChartData2 = {
      labels: [
        'Apr', 
        'May', 
        'Jun'
      ],
      datasets: [
        {
          data: [1, 7, 15, 19, 31, 40]
        },
        {
          data: [6, 12, 18, 24, 30, 36]
        }
      ]
    };
    
    $scope.activeData = $scope.lineChartData;

    $scope.swapData = function () {
      $scope.activeData = $scope.lineChartData2;
    };
  });

})();