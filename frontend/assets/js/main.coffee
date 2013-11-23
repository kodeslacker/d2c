require.config
  paths:
    jquery: '../components/jquery/jquery'
    backstretch: '../components/backstretch/backstretch'
    angular: '../components/ng/angular'
  shim:
    backstretch: ['jquery']

require ['jquery', 'backstretch', 'angular'], ($) ->
  $.backstretch('../img/blur-backgrounds/blur-background05.jpg')
  
  console.log 'jquery loaded'
  
  @consumerUpdateController = ($scope, $http) =>
    $http.get('http://172.28.101.19:9393/getAllConsumerUpdate').success (data) =>
      console.log data[0].attributes
  
  @domusController = ($scope, $http) =>
    $scope.getDomusCode = () =>
      $http.get('http://172.28.101.19:9393/getDomusCode').success (data) =>
        $scope.count = data
  
