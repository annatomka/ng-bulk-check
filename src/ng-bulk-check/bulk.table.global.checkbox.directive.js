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
      scope: {

      },
      controller: 'bulkTableGlobalCheckboxController',
      controllerAs: 'vm',
      bindToController: true,
      link: function (scope, element, attrs, vm){

      }
    };

    return directive;
  }
})();
