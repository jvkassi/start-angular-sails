(function() {
    'use strict';
    /* @ngdoc object
       * @name layout
       * @requires $stateProvider
       *
       * @description
       * 
         Definie les routes et vues abstraites utilise dans toutes l'application
       *
       * @ngInject
       * 
       */
    function config($stateProvider) {
        // snap provider 
        // disable right snap
        $stateProvider.state('root', {
                absctract: true,

            })
            .state('root.app', {
                // url: '/',
                resolve: {
                    UserInfo: function(Auth) {
                        return Auth.info();
                    }
                },
                views: {
                    // target layout view in root state
                    'layout@': {
                        // templateUrl: 'layout/layout.tpl.html',
                        templateProvider: function($templateCache) {
                            // simplified, expecting that the cache is filled
                            // there should be some checking... and async $http loading if not found
                            return $templateCache.get('layout/layout.tpl.html'); // return '<h1>asdf</h1>';
                        },
                        // template: 'asdf',
                        // templateUrl: 'src/app/layout/layout.tpl.html',
                        controller: 'LayoutCtrl as layout'
                    }
                }
            });
    }
    angular.module('layout', [
        'ui.router',
        // 'ngSails',
        'pascalprecht.translate',
        // 'templates-app'
        'ngMaterial'
    ]);
    angular.module('layout').config(config);
}());
