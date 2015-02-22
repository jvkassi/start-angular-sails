(function () {
  'use strict';
  /* @ngdoc object
     * @name login
     * @requires $stateProvider
     *
     * @description
     *
     *
     * @ngInject
     *
     */
  function config($stateProvider) {
    $stateProvider.state('root.login', {
      url: '/login/',
      views: {
        'layout@': {
          // templateUrl: 'login/login.tpl.html',
          templateProvider: function ($templateCache) {
            // simplified, expecting that the cache is filled
            // there should be some checking... and async $http loading if not found
            return $templateCache.get('login/login.tpl.html');
          },
          controller: 'LoginCtrl as login'
        }
      }
    });
  }
  angular.module('login', [
    'ui.router',
    // 'ngSails'
  ]);
  angular.module('login').config(config);
}());