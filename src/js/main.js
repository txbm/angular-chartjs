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
        template: '<div><canvas class="cjs-chart"></canvas></div>',
        replace: true,
        require: '?legend',
        scope: {
          dataset: '=',
          options: '=',
          legend: '@'
        },
        link: function postLink(scope, element, attrs) {
          var chartEl;
          var legendEl;

          if(attrs.legend === 'before') {
            element.prepend('<div class="cjs-legend"></div>');
            chartEl = element[0].children[1];
            legendEl = element[0].children[0];
          }

          if (attrs.legend === 'after' || !attrs.legend ) {
            element.append('<div class="cjs-legend"></div>');
            chartEl = element[0].children[0];
            legendEl = element[0].children[1];
          }

          var ctx = chartEl.getContext('2d'),
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
          legendEl.innerHTML = chart.generateLegend();

          scope.$watch('dataset', function (newData, oldData) {
            chart.initialize(newData);
            legendEl.innerHTML = chart.generateLegend();
          }, true);

          scope.$watch('options', function (newData, oldData) {
            angular.extend(
              chart.options,
              scope.options
            );
          }, true);

        }
      };
    };
  });

  chartjs.directive('legend', function() {
    return {
      controller: function($scope) {}
    }
  });

})();
