(function() {
    'use strict';
    /**
     * @ngdoc object
     * @name login.controller:LoginCtrl
     * @function
     *
     * @description
     *
     *
     * @ngInject
     *
     */
    function LoginCtrl($scope, Auth, $state, $location, $mdToast) {

        $scope.authenticate = function() {
            Auth.login($scope.user).success(function(data) {
                    console.log(data);
                    if (typeof(data.errors) === "undefined") {

                        $state.go('root.app.snap');
                    } else {

                        $mdToast.show($mdToast.simple()
                            .content(data.errors[0])
                            .position("top right")
                        );
                    }
                }).error(function(err) {
                    console.log(err);
                      $mdToast.show($mdToast.simple()
                        .content(err.errors[0])
                        .position("top right")
                    );
                });
                // console.log($scope.user);
        };
    }
    angular.module('login').controller('LoginCtrl', LoginCtrl);
}());
