'use strict';

(function () {
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
      chartjs.directive('cjs' + upper, function (chartFactory) { 
        return new chartFactory(chartType) 
      });
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

  chartjs.factory('chartFactory', function () {
    return function (chartType) {

      var chartType = chartTypes[chartType],
        extractSpecOpts = function (opts, attrs) {
          var i = opts.length, 
            extracted = {},
            cv;
          
          while (i--) {
            cv = attrs[opts[i]];
            if (typeof(cv) !== 'undefined') {
              extracted[opts[i]] = cv;
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
          options: '=',
          autofit: '='
        },
        link: function postLink(scope, element, attrs) {
          var ctx = element[0].getContext('2d'),
              chart = new Chart(ctx),
              chartOpts = {},
              specOpts = [],
              autofit = scope.autofit,
              bound = false,
              drawChart = function (value, forceRedraw) {
                if ((autofit && fitChart(ctx.canvas, element)) || forceRedraw) {
                  chart = new Chart(ctx);
                  chart[chartType](value, chartOpts);
                }

                if (!bound) {
                  angular.element(window).bind('resize', function () {
                    drawChart(value);
                  });
                  bound = true;
                }
              };

          // HACK: to get default params out of protected scope from ChartJS
          try {
            chart[chartType]([], {});
          } catch (e) {}
          specOpts = Object.keys(chart[chartType].defaults);
          // ENDHACK

          angular.extend(chartOpts, scope.options, extractSpecOpts(specOpts, attrs));

          scope.$watch('dataset', function (value) {
            if (!value) {
              return;
            }
            drawChart(value, true);
          }, true);
        }
      }
    }
  });
})();
