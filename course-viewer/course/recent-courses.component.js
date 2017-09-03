(function () {
  'use strict';

  angular.module('courseViewer').component('recentCourses', {
    bindings: {
      loggedIn: '<'
    },
    controllerAs: 'vm',
    controller: function (courseService, authenticationService) {
      var vm = this;

      vm.recentlyViewed = null;
      vm.authenticationService = authenticationService;

      vm.$onChanges = function (changes) {
        if (authenticationService.loggedIn) {
          courseService.getRecentlyViewedCourses(authenticationService.userName).then(function (recentlyViewed) {
            vm.recentlyViewed = recentlyViewed;

          });
        }
      }

      vm.clearList = function () {
        courseService.clearRecentlyViewedList(authenticationService.userName);
        vm.recentlyViewed = null;
      }
    },
    templateUrl: 'course-viewer/course/recent-courses.component.html'
  });
})();