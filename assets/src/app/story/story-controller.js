(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name story.controller:StoryCtrl
   *
   * @description
   *
   */
  angular
    .module('story')
    .controller('StoryCtrl', StoryCtrl);

  function StoryCtrl(Story, $stateParams) {
    var vm = this;
    vm.ctrlName = 'StoryCtrl';

    Story.filter($stateParams.id);
  }

})();
