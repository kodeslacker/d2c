(function() {
  var consumerUpdateController, domus, domusController, maintenanceController;

  console.log("Javascript loaded");

  $.backstretch("../img/blur-backgrounds/blur-background13.jpg");

  toastr.options = {
    "closeButton": false,
    "debug": true,
    "positionClass": "toast-top-full-width",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

  domus = angular.module("domus", []);

  domus.config([
    "$routeProvider", function($routeProvider) {
      $routeProvider.when("/", {
        templateUrl: "main.html",
        controller: domusController
      });
      $routeProvider.when("/dashboard", {
        templateUrl: "dashboard.html",
        controller: domusController
      });
      return $routeProvider.when("/dashboard/maintenance", {
        templateUrl: "maintenance.html",
        controller: maintenanceController
      });
    }
  ]);

  consumerUpdateController = function($scope, $http) {
    return $http.get("http://172.28.101.19:9393/getAllConsumerUpdate").success(function(data) {
      return console.log(data[0].attributes);
    });
  };

  domusController = function($scope, $http, $location) {
    $scope.getDomusCode = function() {
      return $http.get("http://172.28.101.19:9393/getDomusCode").success(function(data) {
        return $scope.code = data;
      });
    };
    return $scope.checkDomusCode = function() {
      return $http.get("http://172.28.101.19:9393/checkDomusCode/" + $scope.code).success(function(data) {
        if (data === "true") {
          return $location.path('/dashboard');
        }
      });
    };
  };

  maintenanceController = function($scope, $http, $location) {
    $scope.getConsumers = function() {
      return $http.get("http://172.28.101.19:9393/getAllConsumers").success(function(data) {
        return $scope.consumers = data;
      });
    };
    return $scope.updateConsumer = function(item) {
      return $http.post("http://172.28.101.19:9393/submitConsumerUpdate", item).success(function(data) {
        return toastr[data.type](data.title, data.message);
      });
    };
  };

}).call(this);
