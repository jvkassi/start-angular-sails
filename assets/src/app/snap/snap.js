(function () {
  'use strict';

  /* @ngdoc object
   * @name snap
   * @requires $stateProvider
   *
   * @description
   *
   */
  angular
    .module('snap', [
      'ui.router',
      'ngMaterial'
    ]);

  angular
    .module('snap')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('root.app.snap', {
      url: '/accounts/:id/snaps',
      views: {
        'container': {
          // templateUrl: 'login/login.tpl.html',
          templateProvider: function ($templateCache) {
            // simplified, expecting that the cache is filled
            // there should be some checking... and async $http loading if not found
            return $templateCache.get('snap/snap.tpl.html');
          },
          controller: 'SnapCtrl as snapCtrl'
        }
      }
    });
  }

})();
