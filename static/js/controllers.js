'use strict';

/* Controllers */

angular.module('modrApp.controllers', []).
  controller('EventListCtrl', function ($scope, $http, socket) {
    socket.on("event", function(data) {
      $scope.events.push(data);
    });
    $http.get('events').success(function(data) {
      $scope.events = data;
    });

    /*$scope.events = [
      {
        "event":"dr",
        "body":{"id":["1"],"ref":["984342374"],"rcv":["4512345678"],"state":["DELIVRD"],"deliverytime":["2006.02.23 15:23:23"]},
        "time":"2014-07-04T15:34:48.436Z"
      }
    ];*/
  });