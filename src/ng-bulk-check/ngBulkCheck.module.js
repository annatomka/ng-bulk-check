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
