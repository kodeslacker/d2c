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

  App.backendPath = "http://192.168.0.107:9393/";

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
    return $scope.checkDomusCode = function() {
      return $http.get(App.backendPath + "checkDomusCode/" + $scope.code).success(function(data) {
        if (data === "true") {
          return $location.path('/dashboard');
        }
      });
    };
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
      return $http.get(App.backendPath + "getVideos/" + $scope.query).success(function(data) {
        return $scope.videos = data;
      });
    };
    return $scope.sendYoutube = function(item) {
      console.log(item);
      toastr["info"]("The video should start playing shortly.", "Youtube request sent!");
      return $http.post(App.backendPath + "submitYoutubeUpdate/", item).success(function(data) {
        return toastr[data.type](data.title, data.message);
      });
    };
  };

  chartsController = function($scope, $http, $location) {
    return $http.get(App.backendPath + "getCharts").success(function(data) {
      var chartData, ctx;
      chartData = {
        labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
        datasets: [
          {
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            data: data
          }
        ]
      };
      ctx = $("#myChart").get(0).getContext("2d");
      return new Chart(ctx).Line(chartData);
    });
  };

}).call(this);
