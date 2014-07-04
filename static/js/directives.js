'use strict';

/* Controllers */

angular
  .module('modrApp.directives', [])
  .directive('eventDetail', function($compile) {
    var moTemplate = '<div>From: {{content.body.SND}} Text: {{content.body.TEXT}}</div>';
    var drTemplate = '<div>From: {{content.body.SND}} State: {{content.body.STATE}}</div>';
    var rejectTemplate = '<div>Rejected: {{content.body.username}}:{{content.body.password}}</div>';    

    var getTemplate = function(eventtype) {
        var template = '';

        switch(eventtype) {
            case 'dr':
                template = drTemplate;
                break;
            case 'mo':
                template = moTemplate;
                break;
            case 'reject':
                template = rejectTemplate;
                break;
        }

        return template;
    }

    var linker = function(scope, element, attrs) {
      element.html(getTemplate(scope.content.event));
      $compile(element.contents())(scope);
    }

    return {
      restrict: "E",
      rep1ace: true,
      link: linker,
      scope: {
          content:'='
      }
    };    
  });