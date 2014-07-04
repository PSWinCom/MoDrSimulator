var modrApp = angular.module('modrApp', []);

modrApp.controller('EventListCtrl', function ($scope) {
  $scope.events = [
    {
      "event":"dr",
      "body":{"id":["1"],"ref":["984342374"],"rcv":["4512345678"],"state":["DELIVRD"],"deliverytime":["2006.02.23 15:23:23"]},
      "time":"2014-07-04T15:34:48.436Z"
    }
  ];
});