(function () {
  'use strict';

  var appModule = angular.module('courseViewer', ['securityModule', 'ui.router']);

  appModule.value('apiBase', 'http://pluralsightcourseviewer.azurewebsites.net/api/courseviewer/');
  appModule.value('componentBorders', true);

  appModule.run(function($rootScope) {
  $rootScope.$on("stateChangeError", console.log.bind(console));
  });

  appModule.run(function (componentBorders) {
    if (componentBorders) {
      if (appModule._invokeQueue) {
        appModule._invokeQueue.forEach(function (item) {
          if (item[1] == 'component') {
            var componentName = item[2][0];
            var componentProperties = item[2][1];
            if (componentProperties.templateUrl) {
              var templateUrl = componentProperties.templateUrl;
              delete componentProperties.templateUrl;
              componentProperties.template = '<div class="component-borders"></b>' + componentName + '</b><div ng-include="\'' + templateUrl + '\'"></div></div>';
            } else {
              var template = '<div class="component-borders">' + componentName + '<div>' + componentProperties.template + '</div></div>';
              componentProperties.template = template;
            }
          }
        })
      }
    }
  });

  appModule.config(function ($stateProvider, $urlRouterProvider) {

    var states = [
      {
        name: 'home',
        url: '',
        template: '<home></home>'
      },
      {
        name: 'home2',
        url: '/',
        template: '<home></home>',
      },
      {
        name: 'courses',
        url: '/courses',
        template: '<course-list></course-list>'
      },
      {
        name: 'course',
        url: '/course/{courseId}',
        resolve: {
          courseId: function ($stateParams) {
            return $stateParams.courseId;
          }
        },
        template: '<course course-id="$resolve.courseId"></course>'
      },
      {
        name: 'course.modules',
        url: '/modules',
        template: '<course-modules course="vm.course"></course-modules>'
      },
      {
        name: 'course.description',
        url: '/description',
        template: '<course-description course="vm.course"></course-description>'
      },
      {
        name: 'course.discussion',
        url: '/discussion',
        template: '<course-discussion course="vm.course"></course-discussion>'
      },
      {
        name: 'authors',
        url: '/authors',
        template: '<author-list></author-list>'
      }
    ];

    $urlRouterProvider.when('/course/:courseId', '/course/:courseId/modules');
    $urlRouterProvider.otherwise('/');

    states.forEach(function (state) {
      $stateProvider.state(state);
    });

  });
})();