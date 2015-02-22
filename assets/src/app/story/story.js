(function () {
  'use strict';

  /* @ngdoc object
   * @name story
   * @requires $stateProvider
   *
   * @description
   *
   */
  angular
    .module('story', [
      'ui.router'
    ]);

  angular
    .module('story')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('root.app.story', {
        url: '/story/:id',
        templateUrl: 'story/story.tpl.html',
        controller: 'StoryCtrl as story'
      });
  }

})();
