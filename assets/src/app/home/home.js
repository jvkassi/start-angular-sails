(function() {
    'use strict';
    /* @ngdoc object
     * @name home
     * @requires $stateProvider
     *
     * @description
     *
     *
     * @ngInject
     *
     */
    function config($stateProvider, $locationProvider) {
        // $locationProvider.html5Mode(true);
        $stateProvider.state('root.app.home', {
            url: '/',
            views: {
                'container': {
                    // templateUrl: 'home/home.tpl.html',
                    templateProvider: function($templateCache) {
                        // simplified, expecting that the cache is filled
                        // there should be some checking... and async $http loading if not found
                        return $templateCache.get('home/home.tpl.html');
                    },
                    controller: 'HomeCtrl as home'
                }
            }
        });
    }
    angular.module('home', ['ui.router']);
    angular.module('home').config(config);
}());
