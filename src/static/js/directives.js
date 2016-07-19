'use strict';

/* Controllers */

angular
  .module('modrApp.directives', [])
  .directive('eventDetail', function($compile) {
    var moTemplate = '<div><div><span class="label label-primary">{{content.body.SND}}</span> <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span> </span><span class="label label-default">{{content.body.RCV}}</span></div><div style="font-size: 3vw">{{content.body.TEXT || content.body.TXT}}</div></div>';
    var drTemplate = '<div><span class="label label-primary">{{content.body.RCV}}</span> <span class="label label-default">{{content.body.STATE}}</span><div>{{content.body.REF}}</div></div>';
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