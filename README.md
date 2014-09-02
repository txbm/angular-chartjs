## angular-chartjs


[![Build Status](http://img.shields.io/travis/petermelias/angular-chartjs.svg)](https://travis-ci.org/petermelias/angular-chartjs)
[![Coverage](http://img.shields.io/coveralls/petermelias/angular-chartjs.svg)](https://coveralls.io/r/petermelias/angular-chartjs)
[![NPM Downloads](http://img.shields.io/npm/dm/angular-chartjs.svg)](https://www.npmjs.org/package/angular-chartjs)
[![NPM Version](http://img.shields.io/npm/v/angular-chartjs.svg)](https://www.npmjs.org/package/angular-chartjs)
[![Github Issues](http://img.shields.io/github/issues/petermelias/angular-chartjs.svg)](https://github.com/petermelias/angular-chartjs/issues)


A fully functional directive set for the ChartJS library. Supports data bindings and attribute-level specification for chart specific options.

### Installation

##### Using Bower

```bash
bower install ng-chartjs
```

##### Using NPM

```bash
npm install angular-chartjs
```


##### Setup

```html
<!--
Include Angular ~1.2.21
Include Chart.js >= v1.0.1-beta.3
-->
<script type="text/javascript" src="bower_components/ng-chartjs/src/angular-chartjs.js"></script>
```

and in your app init...

```javascript
var app = angular.module('myApp', ['chartjs']);
```

### Usage

There is a directive for each of the 6 chart types in ChartJS. Data is set on the $scope in the controller and the options can be passed in via the controller and / or overridden on the directive call.

In the template...

```html
<div ng-controller="testCtrl">
	<cjs-doughnut dataset="someData" options="someOptions" segement-stroke-width="5"></cjs-doughnut>

	<!--
	<cjs-bar></cjs-bar>
	<cjs-line></cjs-line>
	<cjs-radar></cjs-radar>
	<cjs-polar></cjs-polar>
	<cjs-pie></cjs-pie>
	-->
</div>
```

In the controller...

```javascript
myapp.controller('testCtrl', function ($scope) {
	$scope.someData = [
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
	];

	$scope.someOptions = {
		segementStrokeWidth: 20,
		segmentStrokeColor: '#000'
	};
});
```

This will result in a Doughnut chart using the dataset from the controller with a StrokeColor of #000 and a StrokeWidth of 5 because options set on the directive attributes override controller level settings for maximum flexibility.

### Examples

If you want to see an example for every chart, download the library and go to the ```test/app``` directory. Launch ```index.html``` in a browser and all of the charts will load. You will find the test controller in the ```test/app/js``` directory.

All charts and options work. No actual JS (beyond the dataset) is required to use this directive set unless you want to bulk specify many options, in which case it's better to do that in the controller.

You can also run this example online through the following plunker: http://embed.plnkr.co/pC7gJ7/preview


### Tests

```bash
gulp test
```

### Demo

Open a browser pointed at ```demo/index.html```



