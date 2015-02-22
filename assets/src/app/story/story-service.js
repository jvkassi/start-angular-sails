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
    function Story(Generic, User, Api, Req) {

        var self = this;
        var Base = new Generic('snaps/', User.infos.id);

        Base.postToStory = function postToStory(id) {
            return Req.post(Api + 'snaps/' + id + '/post');
        };

        return Base;
    }
    angular.module('story').factory('Story', Story);
}());
