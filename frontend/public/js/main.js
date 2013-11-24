(function() {
  var chartsController, consumerUpdateController, domus, domusController, maintenanceController, mediaController;

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

  $(function() {
    return FastClick.attach(document.body);
  });

  window.App = {};

  App.backendPath = "http://172.28.101.19:9393/";

  domus = angular.module("domus", []);

  domus.config([
    "$routeProvider", function($routeProvider) {
      $routeProvider.when("/", {
        templateUrl: "main.html",
        controller: domusController
      });
      $routeProvider.when("/dashboard", {
        templateUrl: "profile.html",
        controller: domusController
      });
      $routeProvider.when("/dashboard/maintenance", {
        templateUrl: "maintenance.html",
        controller: maintenanceController
      });
      $routeProvider.when("/dashboard/media", {
        templateUrl: "media.html",
        controller: mediaController
      });
      return $routeProvider.when("/dashboard/charts", {
        templateUrl: "charts.html",
        controller: chartsController
      });
    }
  ]);

  consumerUpdateController = function($scope, $http) {
    return $http.get("getAllConsumerUpdate").success(function(data) {
      return console.log(data[0].attributes);
    });
  };

  domusController = function($scope, $http, $location) {
    $scope.getDomusCode = function() {
      return $http.get(App.backendPath + "getDomusCode").success(function(data) {
        return $scope.code = data;
      });
    };
    $scope.checkDomusCode = function() {
      return $http.get(App.backendPath + "checkDomusCode/" + $scope.code).success(function(data) {
        if (data === "true") {
          return $location.path('/dashboard');
        }
      });
    };
    $scope.client_id = window.gapi_id;
    return $scope.display_name = window.display_name;
  };

  maintenanceController = function($scope, $http, $location) {
    $scope.getConsumers = function() {
      return $http.get(App.backendPath + "getAllConsumers").success(function(data) {
        return $scope.consumers = data;
      });
    };
    return $scope.updateConsumer = function(item) {
      $("#consumer-" + item.id).button('loading');
      return $http.post(App.backendPath + "submitConsumerUpdate", item).success(function(data) {
        toastr[data.type](data.title, data.message);
        return $scope.getConsumers();
      });
    };
  };

  mediaController = function($scope, $http, $location) {
    $scope.search = function() {
      return $http.get(App.backendPath + "getVideos/" + $scope.query.split(' ').join('+')).success(function(data) {
        return $scope.videos = data;
      });
    };
    return $scope.sendYoutube = function(item) {
      toastr["info"]("The video should start playing shortly.", "Youtube request sent!");
      return $http.post(App.backendPath + "submitMediaUpdate/" + item, {}).success(function(data) {
        return toastr[data.type](data.title, data.message);
      });
    };
  };

  chartsController = function($scope, $http, $location) {
    var chartData, ctx;
    chartData = {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      datasets: [
        {
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          data: [115, 234, 120, null, null, null]
        }
      ]
    };
    ctx = $("#chart-1").get(0).getContext("2d");
    new Chart(ctx).Line(chartData);
    chartData = {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      datasets: [
        {
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          data: [115, 234, 120, 37, 222, 800]
        }
      ]
    };
    ctx = $("#chart-2").get(0).getContext("2d");
    return new Chart(ctx).Line(chartData);
  };

}).call(this);
