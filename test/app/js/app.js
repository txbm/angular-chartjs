'use strict';

var app = angular.module('testapp', ['chartjs']);

app.controller('testCtrl', function ($scope) {
  $scope.doughnutData = [
    {value: 50, color: '#333'},
    {value: 100, color: '#666'}
  ];

  $scope.doughnutOptions = {
    segmentStrokeWidth: 20
  };

  $scope.lineData = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
      {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [65,59,90,81,56,55,40]
      },
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [28,48,40,19,96,27,100]
      }
    ]
  };

  $scope.barData = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
      {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        data : [65,59,90,81,56,55,40]
      },
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        data : [28,48,40,19,96,27,100]
      }
    ]
  };

  $scope.radarData = {
    labels : ["Eating","Drinking","Sleeping","Designing","Coding","Partying","Running"],
    datasets : [
      {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [65,59,90,81,56,55,40]
      },
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [28,48,40,19,96,27,100]
      }
    ]
  }

  $scope.polarData = [
    {
      value : 30,
      color: "#D97041"
    },
    {
      value : 90,
      color: "#C7604C"
    },
    {
      value : 24,
      color: "#21323D"
    },
    {
      value : 58,
      color: "#9D9B7F"
    },
    {
      value : 82,
      color: "#7D4F6D"
    },
    {
      value : 8,
      color: "#584A5E"
    }
  ];

  $scope.pieData = [
    {
      value: 30,
      color:"#F38630"
    },
    {
      value : 50,
      color : "#E0E4CC"
    },
    {
      value : 100,
      color : "#69D2E7"
    }
  ];
});