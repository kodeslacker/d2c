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

window.App = {}
# App.backendPath = "http://172.28.101.19:9393/"
App.backendPath = "http://192.168.0.107:9393/"

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
  $routeProvider.when "/dashboard/media",
    templateUrl: "media.html"
    controller: mediaController
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

maintenanceController = ($scope, $http, $location) ->
  $scope.getConsumers = ->
    $http.get(App.backendPath + "getAllConsumers").success (data) ->
      $scope.consumers = data
  
  $scope.updateConsumer = (item) ->
    $("#consumer-" + item.id).button('loading')
    $http.post(App.backendPath + "submitConsumerUpdate/", item).success (data) ->
      toastr[data.type](data.title, data.message)
      $scope.getConsumers()

mediaController = ($scope, $http, $location) ->
  $scope.search = ->
    $http.get(App.backendPath + "getVideos/" + $scope.query).success (data) ->
      $scope.videos = data
  
  $scope.sendYoutube = (item) ->
    console.log item
    toastr["info"]("The video should start playing shortly.", "Youtube request sent!")
    $http.post(App.backendPath + "submitYoutubeUpdate/", item).success (data) ->
      toastr[data.type](data.title, data.message)
