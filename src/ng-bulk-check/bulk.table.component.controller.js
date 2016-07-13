(function () {
  'use strict';

  angular
    .module('ngBulkCheck')
    .controller("bulkTableComponentController", bulkTableComponentController);

  function bulkTableComponentController($scope) {
    var vm = this;

    vm.selectedAction = {};

    $scope.$watch(function () {
      return vm.actions;
    }, function () {
      vm.enabledActions = filterNotEnabledActions(vm.actions);
    }, true);

    vm.enabledActions = filterNotEnabledActions(vm.actions);

    if (vm.enabledActions && vm.enabledActions.length > 0) {
      vm.selectedAction = vm.enabledActions[0];
    }

    vm.apply = function () {
      var vm = this;

      if (vm.selectedAction) {
        var selectedData = vm.data.filter(function (item) {
          return item.selected == true;
        });

        if (vm.selectedAction.property) {
          selectedData = selectedData.map(function (item) {
            item[vm.selectedAction.property] = item.selected;
            delete item.selected;
          });
        }

        if (selectedData && selectedData.length > 0 && angular.isDefined(vm.selectedAction.callback)) {
          vm.selectedAction.callback(selectedData);
        }
      }

      $scope.$broadcast('action:applied');
      vm.deselectAll();
    };

    vm.selectAll = function () {
      var vm = this;

      vm.data.forEach(function (item) {
        item.selected = true;
      });
    };

    vm.deselectAll = function () {
      var vm = this;

      vm.data.forEach(function (item) {
        item.selected = false;
      });
    };

    function filterNotEnabledActions(actions) {
      return actions.filter(function (action) {
        return angular.isUndefined(action.enabled) || action.enabled;
      });
    }


  }

  bulkTableComponentController.$inject = ['$scope'];
})();
