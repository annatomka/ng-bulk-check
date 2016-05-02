(function () {
  'use strict';

  angular
      .module('ngBulkCheck')
      .directive("bulkTable", bulkTableComponent);

  /** @ngInject */
  function bulkTableComponent() {
    var directive = {
      restrict: 'A',
      templateUrl: 'src/ng-bulk-check/bulk.table.component.directive.tpl.html',
      transclude: true,
      scope: {
        actions: "=",
        data: "="
      },
      controller: bulkTableComponentController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function bulkTableComponentController() {
      var vm = this;

      vm.selectedAction = {};

      if (vm.actions && vm.actions.length > 0) {
        vm.selectedAction = vm.actions[0]
      }

      vm.apply = function () {
        var vm = this;

        if (vm.selectedAction) {
          var selectedData = vm.data.filter(function(item){ return item.selected == true; });

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

      };

      vm.selectAll = function () {
        var vm = this;

        vm.data.forEach(function(item) {
          item.selected = true;
        });
      };

      vm.deselectAll = function () {
        var vm = this;

        vm.data.forEach(function (item) {
          item.selected = false;
        });
      }
    }
  }

})();
