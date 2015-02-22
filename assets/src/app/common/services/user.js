(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name login.service:User
     * @function
     *
     * @description
     *
     * @ngInject
     *
     */
    angular.module('services')
        .factory('User', User);


    function User(Generic, Req, Api) {
        var self = this;
        self.model = 'users/';

        var UserBase = new Generic(self.model);

        UserBase.infos = {};

        UserBase.setId = function(id) {
            UserBase.infos.id = id;
        };
        UserBase.info = function info(id) {
            return Req.get(Api + self.model + id);
        };

        UserBase.login = function login(user) {
            return Req.post(Api + 'login', user);
        };
        UserBase.isLogged = function isLogged() {
            return Req.get(Api + 'logged');
        };
        return UserBase;
    }


}());
