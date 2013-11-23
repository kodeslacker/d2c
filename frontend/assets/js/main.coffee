console.log "Javascript loaded"

$.backstretch "../img/blur-backgrounds/blur-background13.jpg"

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
}

domus = angular.module("domus", [])
domus.config ["$routeProvider", ($routeProvider) ->
  $routeProvider.when "/",
    templateUrl: "main.html"
    controller: domusController
  $routeProvider.when "/dashboard",
    templateUrl: "dashboard.html"
    controller: domusController
  $routeProvider.when "/dashboard/maintenance",
    templateUrl: "maintenance.html"
    controller: maintenanceController
]

consumerUpdateController = ($scope, $http) ->
  $http.get("http://172.28.101.19:9393/getAllConsumerUpdate").success (data) ->
    console.log data[0].attributes


domusController = ($scope, $http, $location) ->
  $scope.getDomusCode = ->
    $http.get("http://172.28.101.19:9393/getDomusCode").success (data) ->
      $scope.code = data


  $scope.checkDomusCode = ->
    $http.get("http://172.28.101.19:9393/checkDomusCode/" + $scope.code).success (data) ->
      if data is "true"
        $location.path '/dashboard'

maintenanceController = ($scope, $http, $location) ->
  $scope.getConsumers = ->
    $http.get("http://172.28.101.19:9393/getAllConsumers").success (data) ->
      $scope.consumers = data
  
  $scope.updateConsumer = (item) ->
    $http.post("http://172.28.101.19:9393/submitConsumerUpdate", item).success (data) ->
      toastr[data.type](data.title, data.message)