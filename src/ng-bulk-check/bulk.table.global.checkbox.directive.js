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
      controller: bulkTableGlobalCheckboxController,
      controllerAs: 'vm',
      bindToController: true,
      link: function (scope, element, attrs, vm){

      }
    };

    return directive;

    function bulkTableGlobalCheckboxController($element, $scope) {
      var vm = this;

      vm.globalSelection = false;
      vm.bulkTableController = $element.controller('bulkTable');

      $scope.$watch(function () {
        return vm.globalSelection;
      },function (newValue, oldValue) {
        if(newValue != oldValue){
          if(newValue){
            vm.bulkTableController.selectAll()
          }else{
            vm.bulkTableController.deselectAll()
          }
        }
      })
    }
  }
})();
