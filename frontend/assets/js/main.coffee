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

$ ->
  FastClick.attach(document.body)

window.App = {}
App.backendPath = "http://172.28.101.19:9393/"
# App.backendPath = "http://192.168.0.107:9393/"
# App.backendPath = "http://192.168.43.171:9393/"

domus = angular.module("domus", [])
domus.config ["$routeProvider", ($routeProvider) ->
  $routeProvider.when "/",
    templateUrl: "main.html"
    controller: domusController
  $routeProvider.when "/dashboard",
    templateUrl: "profile.html"
    controller: domusController
  $routeProvider.when "/dashboard/maintenance",
    templateUrl: "maintenance.html"
    controller: maintenanceController
  $routeProvider.when "/dashboard/media",
    templateUrl: "media.html"
    controller: mediaController
  $routeProvider.when "/dashboard/charts",
    templateUrl: "charts.html"
    controller: chartsController
]

consumerUpdateController = ($scope, $http) ->
  $http.get("getAllConsumerUpdate").success (data) ->
    console.log data[0].attributes


domusController = ($scope, $http, $location) ->
  $scope.getDomusCode = ->
    $http.get(App.backendPath + "getDomusCode").success (data) ->
      $scope.code = data


  $scope.checkDomusCode = ->
    $http.get(App.backendPath + "checkDomusCode/" + $scope.code).success (data) ->
      if data is "true"
        $location.path '/dashboard'
  
  $scope.client_id = window.gapi_id
  $scope.display_name = window.display_name

maintenanceController = ($scope, $http, $location) ->
  $scope.getConsumers = ->
    $http.get(App.backendPath + "getAllConsumers").success (data) ->
      $scope.consumers = data
  
  $scope.updateConsumer = (item) ->
    $("#consumer-" + item.id).button('loading')
    $http.post(App.backendPath + "submitConsumerUpdate", item).success (data) ->
      toastr[data.type](data.title, data.message)
      $scope.getConsumers()

mediaController = ($scope, $http, $location) ->
  $scope.search = ->
    $http.get(App.backendPath + "getVideos/" + $scope.query.split(' ').join('+')).success (data) ->
      $scope.videos = data
  
  $scope.sendYoutube = (item) ->
    toastr["info"]("The video should start playing shortly.", "Youtube request sent!")
    $http.post(App.backendPath + "submitMediaUpdate/" + item, {}).success (data) ->
      toastr[data.type](data.title, data.message)
  
chartsController = ($scope, $http, $location) ->
  # $http.get(App.backendPath + "getCharts").success (data) ->
  chartData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
    datasets: [
      {
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        # data : data
        data: [115, 234, 120, null, null, null]
      }
    ]
  }
  ctx = $("#chart-1").get(0).getContext("2d")
  new Chart(ctx).Line(chartData)
  
  chartData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
    datasets: [
      {
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        # data : data
        data: [115, 234, 120, 37, 222, 800]
      }
    ]
  }
  ctx = $("#chart-2").get(0).getContext("2d")
  new Chart(ctx).Line(chartData)