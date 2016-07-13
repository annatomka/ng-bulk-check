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
