(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name account.controller:AccountCtrl
   *
   * @description
   *
   */
  angular
    .module('account')
    .controller('AccountCtrl', AccountCtrl);

  function AccountCtrl($scope,Account) {

    Account.list().then(function(data) {
      $scope.accounts = data.data;
      console.log(data);
    })

    $scope.login = function login(accountId) {
      Account.login(accountId)
        .then(function(data) {
          console.log(data);
        });
    } 
  }


})();
