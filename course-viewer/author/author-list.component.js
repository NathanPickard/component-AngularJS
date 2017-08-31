(function () {
  'use strict';

  angular.module('courseViewer').component('authorList', {
    bindings: {

    },
    controllerAs: 'vm',
    controller: function () {
      var vm = this;

      vm.$onInit = function () {
        vm.authorId = 101
      }
    },
    templateUrl: 'course-viewer/author/author-list.component.html'
  });
})();