(function () {
  'use strict';
  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function HomeCtrl($state, $timeout) {
    var vm = this;
    vm.ctrlName = 'HomeCtrl';  // $timeout(function() {
                               // $state.transitionTo('root.login');
                               // console.log('change');
                               // }, 1000);
  }
  angular.module('home').controller('HomeCtrl', HomeCtrl);
}());