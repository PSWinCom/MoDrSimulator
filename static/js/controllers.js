'use strict';

/* Controllers */

angular.module('modrApp.controllers', []).
  controller('EventListCtrl', function ($scope, $http, socket) {
    socket.on("event", function(data) {
      data.json = JSON.stringify(data, null, "  ");
      $scope.events.push(data);
    });
    var loaddata = function() {
      $http.get('events').success(function(data) {
        for(idx in data) {
          data[idx].json = JSON.stringify(data[idx], null, "  ");
        }
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