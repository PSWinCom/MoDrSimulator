'use strict';

/* Controllers */

angular
  .module('modrApp.directives', [])
  .directive('eventDetail', function($compile) {
    var moTemplate = '<div>Sender: {{content.body.SND}} Text: {{content.body.TEXT || content.body.TXT}}</div>';
    var drTemplate = '<div>Receiver: {{content.body.RCV}} State: {{content.body.STATE}}, Ref: {{content.body.REF}}</div>';
    var rejectTemplate = '<div>Rejected: {{content.body.username}}:{{content.body.password}}</div>';    

    var getTemplate = function(eventtype) {
        var template = '<div>Generic data</div>';

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