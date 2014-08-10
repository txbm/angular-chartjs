(function () {
  'use strict';

  describe('angular-chartjs', function () {
    var element;
    beforeEach(function () {
      module('chartjs');
      inject(function ($rootScope, $compile) {
        $rootScope.chartData = [
          12,
          14,
          20,
          25,
          31,
          50
        ];
        
        element = angular.element('<cjs-line height="400" width="400" data="chartData"></cjs-line>');

        $compile(element)($rootScope);
        $rootScope.$digest();
      });
    });

    describe('initialization', function () {
      it('should just pass', function () {
        expect(true).to.be.true;
      });
    });
  });
})();