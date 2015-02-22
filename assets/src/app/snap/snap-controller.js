(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name snap.controller:SnapCtrl
     *
     * @description
     *
     */
    angular
        .module('snap')
        .controller('SnapCtrl', SnapCtrl);

    function SnapCtrl($scope, Snap, $mdSidenav, $mdToast, $stateParams,$sce) {
        var vm = this;
        vm.ctrlName = 'SnapCtrl';

        Snap.setFilter($stateParams.id);

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

        $scope.reload = function() {

            $scope.snaps = null;
            Snap.list().success(function(data) {
                $scope.snaps = data;
                console.log("snaps reloaded");
                // $mdSidenav('right').toggle();
            });

        };

        $scope.postToStory = function(id) {
            console.log(id);
            Snap.postToStory(id).success(function(data) {
                // $scope.sms.enabled = true;
                console.log(data);
                $mdToast.show($mdToast.simple()
                    .content(data)
                    .position("top right")
                );
                return 0;
            });
        };

        $scope.reload();

    }

})();
