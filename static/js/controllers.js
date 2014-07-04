'use strict';

/* Controllers */

angular.module('modrApp.controllers', []).
  controller('EventListCtrl', function ($scope, $http, socket) {
    socket.on("event", function(data) {
      $scope.events.push(data);
    });
    var loaddata = function() {
      $http.get('events').success(function(data) {
        $scope.events = data;
      });
    }
    loaddata();
    socket.on("events:refresh", function() {
      console.log("events:refresh");
      loaddata();
    });
    $scope.clearEvents = function() {
      console.log("clearEvents");
      socket.emit("events:clear");
    }
  });