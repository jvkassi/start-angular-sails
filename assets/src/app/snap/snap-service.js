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
    function Snap(Generic, User, Api, Req) {

        // var self = this;
        var Base = new Generic('snaps/');

        Base.postToStory = function postToStory(id) {
            return Req.post(Api + 'snaps/' + id + '/post');
        };

        return Base;
    }
    angular.module('snap').factory('Snap', Snap);
}());
