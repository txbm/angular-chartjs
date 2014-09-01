(function () {
  'use strict';
  
  var chartjs = angular.module('chartjs', []),
    chartTypes = {
      line: 'Line',
      bar: 'Bar',
      radar: 'Radar',
      polar: 'PolarArea',
      pie: 'Pie',
      doughnut: 'Doughnut'
    },
    makeChartDirective = function (chartType) {
      var upper = chartType.charAt(0).toUpperCase() + chartType.slice(1);
      chartjs.directive('cjs' + upper, ['ChartFactory', function (ChartFactory) {
        return new ChartFactory(chartType);
      }]);
    },
    sizeChart = function (width, height, canvas) {
      var oW = canvas.width,
          oH = canvas.height;
      if (oW !== width || oH !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    },
    fitChart = function (canvas, element) {
      var w = element.parent().prop('offsetWidth'),
          h = element.parent().prop('offsetHeight');
      return sizeChart(w, h, canvas);
    };

  for (var c in chartTypes) {
    makeChartDirective(c);
  }

  chartjs.factory('ChartFactory', function () {
    return function (chartType) {

      chartType = chartTypes[chartType];
      var extractSpecOpts = function (opts, attrs) {
          var extracted = {},
              k, c;

          for (k in opts) {
            c = attrs[k];
            if (typeof(c) !== 'undefined') {
              extracted[k] = c;
            }
          }
          return extracted;
        };

      if (typeof(chartType) === 'undefined') {
        return;
      }

      return {
        restrict: 'EAC',
        template: '<canvas></canvas>',
        replace: true,
        scope: {
          dataset: '=',
          options: '='
        },
        link: function postLink(scope, element, attrs) {
          var ctx = element[0].getContext('2d'),
              chart = new Chart(ctx),
              chartOpts = {};

          angular.extend(
            chartOpts, 
            Chart.defaults.global,
            Chart.defaults[chartType]
          );

          angular.extend(
            chartOpts, 
            scope.options,
            extractSpecOpts(
              chartOpts,
              attrs
            )
          );
      
          chart = chart[chartType](scope.dataset, chartOpts);

          scope.$watch('dataset', function (newData, oldData) {
            chart.initialize(newData);
          }, true);
        }
      };
    };
  });
})();
