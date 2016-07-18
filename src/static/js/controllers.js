'use strict';

/* Controllers */

angular.module('modrApp.controllers', []).
  controller('EventListCtrl', function ($scope, $http, socket) {
    var loaddata = function() {
      $http.get('events').success(function(data) {
        for(var idx in data) {
          data[idx].json = JSON.stringify(data[idx], null, "  ");
        }
        $scope.events = data;
      });
    }

    socket.on("event", function(data) {
      data.json = JSON.stringify(data, null, "  ");
      $scope.events.push(data);
    });

    socket.on("events:refresh", function() {
      console.log("events:refresh");
      loaddata();
    });

    loaddata();
    
    $scope.clearEvents = function() {
      console.log("clearEvents");
      socket.emit("events:clear");
    }
  });