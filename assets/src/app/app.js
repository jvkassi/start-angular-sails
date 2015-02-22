(function() {
    'use strict';
    /* @ngdoc object
     * @name sample-polymer
     * @requires $urlRouterProvider
     *
     * @description
     *
     *
     * @ngInject
     *
     */
    function config($mdThemingProvider, $sailsProvider, $locationProvider, $urlRouterProvider, $translateProvider, $httpProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('orange');
        // .backgroundColor('indigo');
        // html5 mode
        $locationProvider.html5Mode(true);
        // return to home otherwire
        $urlRouterProvider.otherwise('/');

        $sailsProvider.url = '';

        // translate stuff
        $translateProvider.translations('fr', {
            'root.app.home': 'Acceuil',
            'root.app.sms': 'SMS',
            'root.app.parents': 'eleves'
        });
        $translateProvider.translations('en', {
            TITLE: 'Hallo',
            FOO: 'Dies ist ein Paragraph.',
            BUTTON_LANG_EN: 'englisch',
            BUTTON_LANG_DE: 'deutsch'
        });
        $translateProvider.preferredLanguage('fr');
        // $httpProvider.interceptors.push(function() {
        //     return {

        //         'response': function(response) {
        //             // same as above
        //             // response.data.req = "http";
        //             return response;
        //         }

        //     };
        // });
    }

    function run($rootScope, $state, Auth, User) {
        $rootScope.$on('$stateChangeStart', function(event, to) {
            Auth.isLogged().success(
                function(data) {
                    // if refresh or go to login dont check auth ok ?
                    if (typeof(data.id) !== "undefined") {

                        if (to.name === 'root.login') {
                            event.preventDefault();
                            $state.go('root.app.home');
                        }
                        User.setId(data.id);
                    } else {
                        $state.go('root.login');

                    }
                    // console.log(res);
                }).error(function() {
                $state.go('root.login');

            });
        });

    }

    // load modules
    angular.module('snapchat', [
        'ui.router',
        'home',
        'services',
        'layout',
        'account',
        'constant',
        'login',
        'story',
        'ngSails',
        'ngMaterial',
        'templates-app',
        'pascalprecht.translate',
        'snap'
    ]);
    angular.module('snapchat').config(config).run(run);
}());
