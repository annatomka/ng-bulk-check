(function () {
  'use strict';

  angular
    .module('ngBulkCheck')
    .controller("bulkTableGlobalCheckboxController", bulkTableGlobalCheckboxController);

  function bulkTableGlobalCheckboxController($element, $scope) {
    var vm = this;

    vm.globalSelection = false;
    vm.bulkTableController = $element.controller('bulkTable');

    $scope.$watch(function () {
      return vm.globalSelection;
    }, function (newValue, oldValue) {
      if (newValue != oldValue) {
        if (newValue) {
          vm.bulkTableController.selectAll()
        } else {
          vm.bulkTableController.deselectAll()
        }
      }
    });

    $scope.$on('action:applied', function () {
      vm.globalSelection = false;
    });
  }

  bulkTableGlobalCheckboxController.$inject = ['$element', '$scope'];
})();
