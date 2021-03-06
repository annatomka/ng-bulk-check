(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('ngBulkCheck.config', [])
      .value('ngBulkCheck.config', {
          debug: true
      });

  // Modules
  angular.module('ngBulkCheck.directives', []);
  angular.module('ngBulkCheck.filters', []);
  angular.module('ngBulkCheck.services', []);
  angular.module('ngBulkCheck',
      [
          'ngBulkCheck.config',
          'ngBulkCheck.directives',
          'ngBulkCheck.filters',
          'ngBulkCheck.services'
      ]);

})(angular);

angular.module("ngBulkCheck").run(["$templateCache", function($templateCache) {$templateCache.put("src/ng-bulk-check/bulk.table.component.directive.tpl.html","<div class=\"bulk-table-component\"><div class=\"bulk-table-form\"><form role=\"form\" class=\"form-inline\"><div class=\"form-group\"><select class=\"form-control\" name=\"action\" id=\"action\" ng-options=\"option as (option.id) for option in vm.enabledActions\" ng-model=\"vm.selectedAction\"></select></div><button class=\"btn btn-info\" type=\"submit\" ng-click=\"vm.apply()\" ng-disabled=\"!vm.selectedAction\">Apply</button></form></div><div ng-transclude=\"\"></div></div>");
$templateCache.put("src/ng-bulk-check/bulk.table.global.checkbox.directive.tpl.html","<div><label><input icheck=\"\" type=\"checkbox\" ng-model=\"vm.globalSelection\"></label></div>");}]);
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
      controller: 'bulkTableComponentController',
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();

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

(function () {
  'use strict';

  angular
    .module('ngBulkCheck')
    .directive("bulkTableGlobalCheckbox", bulkTableGlobalCheckbox);

  /** @ngInject */
  function bulkTableGlobalCheckbox() {
    var directive = {
      restrict: 'A',
      templateUrl: 'src/ng-bulk-check/bulk.table.global.checkbox.directive.tpl.html',
      scope: {},
      controller: 'bulkTableGlobalCheckboxController',
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
})();
