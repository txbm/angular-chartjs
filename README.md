# angular-chartjs

A fully functional directive set for the ChartJS library. Supports data bindings and attribute-level specification for chart specific options.

## Installation

```html

<!-- 
Include Angular
Include ChartJS >= 0.2
-->
<script type="text/javascript" src="angular-chartjs.js"></script>
```

## Usage

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
		{value: 50, color: '#666'},
		{value: 100, color: '#333'}
	]

	$scope.someOptions = {
		segementStrokeWidth: 20,
		segmentStrokeColor: '#000'
	}
});
```

This will result in a Doughnut chart using the dataset from the controller with a StrokeColor of #000 and a StrokeWidth of 5 because options set on the directive attributes override controller level settings for maximum flexibility.

## Examples

If you want to see an example for every chart, download the library and go to the ```test/app``` directory. Launch ```index.html``` in a browser and all of the charts will load. You will find the test controller in the ```test/app/js``` directory.

All charts and options work. No actual JS (beyond the dataset) is required to use this directive set unless you want to bulk specify many options, in which case it's better to do that in the controller.

## Tests

There are no unit tests currently written because the demo proves that everything works. I will add unit tests later, but it will be a formality. If you want to verify this, launch the test/app/index.html page.





[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/petermelias/angular-chartjs/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

