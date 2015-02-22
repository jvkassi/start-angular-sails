(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name login.service:Auth
     * @function
     *
     * @description
     *
     * @ngInject
     *
     */
    function Auth($sails, $http, Generic, Api, Req) {
        var self = this;


        self.model = "auths/";
        var AuthBase = new Generic(self.model);

        // Get 
        AuthBase.get = function get() {
            return 'Auth';
        };

        // Logout
        AuthBase.logout = function logout(user) {
            return Req.post(Api + self.model + 'logout', user);
        };

        // Get Connected User info
        AuthBase.info = function info() {
            return Req.get(Api + self.model + 'info');
        };

        AuthBase.login = function login(user) {
            return Req.post(Api + self.model + 'login', user);
        };
        AuthBase.isLogged = function isLogged() {
            // console("CHeck");
            // console.log( Req.get(Api + self.model  + 'logged'));
            return Req.get(Api + self.model + 'logged');
        };
        return AuthBase;
    }
    angular.module('services').factory('Auth', Auth);
}());
