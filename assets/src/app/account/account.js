(function() {
    'use strict';

    /* @ngdoc object
     * @name account
     * @requires $stateProvider
     *
     * @description
     *
     */
    angular
        .module('account', [
            'ui.router'
        ]);

    angular
        .module('account')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('root.app.account', {
                url: '/account',
                views: {
                    'container': {
                        templateUrl: 'account/account.tpl.html',
                        controller: 'AccountCtrl',
                        controllerAs: 'accountsss'
                    }
                }
            });
    }

})();
