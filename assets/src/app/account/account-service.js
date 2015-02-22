(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name account.service:Account
     *
     * @description
     *
     */
    angular
        .module('account')
        .service('Account', Account);

    function Account(Api,Req, Generic) {
 
        var self = this;
        self.model = "accounts/";
        var Base = new Generic(self.model);

        Base.login = function login(accountId) {
               return Req.post(Api + self.model + accountId + '/login');
        };

        // self.get = function get() {
        //     return 'Account';
        // };
        return Base;
    }

})();
