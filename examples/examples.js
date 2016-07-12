var app = angular.module('ngBulkCheckTest', [
  'ngBulkCheck'
]);

app.run(function () {
  console.log("ngBulkCheck module test initiated");
});

app.controller("TestController", function ($scope) {
  $scope.items = [{
    id: 0,
    name: 'Item 1'
  }, {
    id: 0,
    name: 'Item 2'
  }];

  $scope.selectedItemsStr = "";

  $scope.actions = [{
    id: 'Alert',
    enabled: false,
    callback: function (data) {
      alert(arrayToString(data));
    }
  }, {
    id: 'Log',
    callback: function (items) {
      $scope.selectedItemsStr = arrayToString(items);
    }
  }];

  $scope.enableAlertAction = function () {
    $scope.actions[0].enabled = true;
  };

  $scope.enableAllAction = function () {
    $scope.actions.forEach(function (action) {
      action.enabled = true;
    });
  };

  $scope.disableAllAction = function () {
    $scope.actions.forEach(function (action) {
      action.enabled = false;
    });
  };

  $scope.$watchCollection(function () {
    return $scope.actions;
  }, function () {
    console.log("actions changed")
  });

  function arrayToString(data) {
    return data.map(function (item) {
      return item.name;
    }).join(",");
  }
});
