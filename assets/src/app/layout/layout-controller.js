(function() {
    'use strict';
    /**
     * @ngdoc object
     * @name layout.controller:LayoutCtrl
     * @function
     *
     * @description
     *
     *
     * @ngInject
     *
     */
    function LayoutCtrl($scope, $state, $mdDialog, Auth, User, $mdSidenav) {
        var vm = this;
        $scope.$state = $state;
        $scope.User = User;
        
        $scope.openMenu = function() {
            // $timeout(function() {
            $mdSidenav('menu').open(); 
        };

        $scope.openSettings = function(ev) {
            $scope.n = $scope.user;
            console.log(ev);
            $mdDialog.show({
                    targetEvent: ev,
                    templateUrl: 'account/account.dialog.tpl.html',
                    controller: 'AccountCtrl'
                })
                .then(function(answer) {
                    $scope.alert = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.alert = 'You cancelled the dialog.';
                });
            // .finally($scope.reload);
        };

        $scope.hideSettings = function($event) {
            $mdDialog.hide();
        };

        $scope.hide = function() {
            $mdDialog.hide();

        };

        $scope.save = function() {
            User.update($scope.user, $scope.user.id).success($scope.hide);
        };

        $scope.reload = function() {

            Auth.info().success(function(data) {
                $scope.user = data;
                // console.log(data);
            });
        };
        $scope.reload();

        $scope.logout = function() {
            Auth.logout().success(function(data) {
                $state.go('root.login');
            });
        };
    }
    angular.module('layout').controller('LayoutCtrl', LayoutCtrl);
}());
